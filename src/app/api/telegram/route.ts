import dayjs from 'dayjs';
import { eq, lt, or } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

import { ApiErrorClass } from '@/classes/ApiError';
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

export async function DELETE(req: NextRequest): API<unknown> {
  try {
    const userInfo = await fetchUserInfo();

    await db.update(users).set({ telegramID: null }).where(eq(users.id, userInfo.sub));
    return NextResponse.json({
      status: 'success',
    });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
