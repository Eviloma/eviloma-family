import dayjs from "dayjs";
import { eq, lt, or } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { customAlphabet } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";

import { ApiErrorClass, ForbiddenError, MissingRequiredParamsError, UserNotFoundError } from "@/classes/ApiError";
import db from "@/db";
import { telegramLinkTokens, users } from "@/db/schema";
import type API from "@/types/api";
import type TelegramPOST from "@/types/telegram-post";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 16);

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
        validUntil: dayjs().add(15, "minutes").toDate(),
      })
      .returning();

    // Return token
    if (!newToken[0]) {
      throw new ApiErrorClass(StatusCodes.INTERNAL_SERVER_ERROR, "Помилка створення токена");
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
    const authorization = req.headers.get("Authorization");

    if (!authorization || authorization !== `Bearer ${process.env.TELEGRAM_API_KEY}`) {
      throw ForbiddenError();
    }

    const { token, telegramID, username } = await req.json();

    if (!token || !telegramID) {
      throw MissingRequiredParamsError({ message: "Токен та телеграмм ID не можуть бути порожніми" });
    }

    const tokenObject = await db.query.telegramLinkTokens.findFirst({
      where: eq(telegramLinkTokens.token, token),
    });

    if (!tokenObject) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Невірний токен", {
        code: "INVALID_TOKEN",
        telegram:
          "Помилка😞\nℹ️ Час на підключення вашого Telegram акаунту вичерпано. Спробуйте ще раз або зверніться за допомогою до адміністрації.",
      });
    }

    if (dayjs(tokenObject.validUntil).isBefore(dayjs())) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Токен вже вичерпаний", {
        code: "EXPIRED_TOKEN",
        telegram:
          "Помилка😞\nℹ️ Час на підключення вашого Telegram акаунту вичерпано. Спробуйте ще раз або зверніться за допомогою до адміністрації.",
      });
    }

    const telegramUser = await db.query.users.findFirst({
      where: eq(users.telegramID, telegramID),
    });

    if (telegramUser) {
      throw new ApiErrorClass(StatusCodes.CONFLICT, "Користувач вже зареєстрований", {
        code: "ALREADY_REGISTERED",
        telegram: "Помилка😞\nℹ️ Схоже, що ваш Telegram вже підключено до іншого облікового запису Eviloma Family.",
      });
    }

    const user = await db
      .update(users)
      .set({ telegramID, telegramUsername: username })
      .where(eq(users.id, tokenObject.user))
      .returning();

    if (!user || user.length === 0) {
      throw UserNotFoundError();
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
      status: "success",
    });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
