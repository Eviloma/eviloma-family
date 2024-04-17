import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ForbiddenError, UserNotFoundError } from "@/classes/ApiError";
import db from "@/db";
import { users } from "@/db/schema";
import apiErrorHandler from "@/utils/api/api-error-handler";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authorization = req.headers.get("Authorization");

    if (!authorization || authorization !== `Bearer ${process.env.TELEGRAM_API_KEY}`) {
      throw ForbiddenError();
    }

    const user = await db.query.users.findFirst({
      with: {
        subscriptions: {
          columns: {},
          with: {
            subscription: true,
          },
        },
        transactions: true,
      },
      where: eq(users.telegramID, params.id),
    });

    if (!user) {
      throw UserNotFoundError({
        telegram: "Помилка😞\nℹ️ Схоже, що ваш Telegram не підключено до сайту Eviloma Family.",
      });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization || authorization !== `Bearer ${process.env.TELEGRAM_API_KEY}`) {
      throw ForbiddenError();
    }

    await db.update(users).set({ telegramID: null, telegramUsername: null }).where(eq(users.telegramID, params.id));

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
