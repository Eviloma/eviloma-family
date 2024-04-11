import dayjs from 'dayjs';
import { eq, lt, or } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

import { ApiErrorClass, ForbiddenError } from '@/classes/ApiError';
import db from '@/db';
import { telegramLinkTokens, users } from '@/db/schema';
import API from '@/types/api';
import TelegramPOST from '@/types/telegram-post';
import apiErrorHandler from '@/utils/api/api-error-handler';
import fetchUserInfo from '@/utils/api/authorization-check';

// eslint-disable-next-line no-secrets/no-secrets
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16);

export async function POST(req: NextRequest): API<TelegramPOST> {
  try {
    const userInfo = await fetchUserInfo();

    // Remove old tokens
    await db
      .delete(telegramLinkTokens)
      .where(or(eq(telegramLinkTokens.user, userInfo.sub), lt(telegramLinkTokens.validUntil, dayjs().toDate())));

    // Create new token
    const newToken = await db
      .insert(telegramLinkTokens)
      .values({
        token: nanoid(16),
        user: userInfo.sub,
        validUntil: dayjs().add(15, 'minutes').toDate(),
      })
      .returning();

    // Return token
    if (!newToken[0]) {
      throw new ApiErrorClass(StatusCodes.INTERNAL_SERVER_ERROR, 'Помилка створення токена');
    }

    return NextResponse.json({
      token: newToken[0]?.token,
    });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');

    if (!authorization || authorization !== `Bearer ${process.env.TELEGRAM_API_KEY}`) {
      throw ForbiddenError;
    }

    const { token, telegramID, username } = await req.json();

    if (!token || !telegramID) {
      throw new ApiErrorClass(
        StatusCodes.BAD_REQUEST,
        'Токен та телеграмм ID не можуть бути порожніми',
        undefined,
        'MISSING_PARAMS'
      );
    }

    const tokenObject = await db.query.telegramLinkTokens.findFirst({
      where: eq(telegramLinkTokens.token, token),
    });

    if (!tokenObject) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Невірний токен', 'INVALID_TOKEN');
    }

    if (dayjs(tokenObject.validUntil).isBefore(dayjs())) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Токен вже вичерпаний', 'EXPIRED_TOKEN');
    }

    const telegramUser = await db.query.users.findFirst({
      where: eq(users.telegramID, telegramID),
    });

    if (telegramUser) {
      throw new ApiErrorClass(StatusCodes.CONFLICT, 'Користувач вже зареєстрований', 'ALREADY_REGISTERED');
    }

    const user = await db
      .update(users)
      .set({ telegramID, telegramUsername: username })
      .where(eq(users.id, tokenObject.user))
      .returning();

    if (!user || user.length === 0) {
      throw new ApiErrorClass(StatusCodes.NOT_FOUND, 'Користувач не знайдено', 'USER_NOT_FOUND');
    }

    await db.delete(telegramLinkTokens).where(eq(telegramLinkTokens.id, tokenObject.id));

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}

export async function DELETE(req: NextRequest): API<unknown> {
  try {
    const userInfo = await fetchUserInfo();

    await db.update(users).set({ telegramID: null, telegramUsername: null }).where(eq(users.id, userInfo.sub));
    return NextResponse.json({
      status: 'success',
    });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
