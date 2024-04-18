import { eq, sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { type NextRequest, NextResponse } from "next/server";

import { ApiErrorClass, ForbiddenError, UserNotFoundError } from "@/classes/ApiError";
import db from "@/db";
import { transactions, users } from "@/db/schema";
import apiErrorHandler from "@/utils/api/api-error-handler";
import sendDepositNotification from "@/utils/telegram/deposit";

export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization");

    if (!authorization || authorization !== `Bearer ${process.env.PAYMENT_API_KEY}`) {
      throw ForbiddenError();
    }

    const { id, suma } = await req.json();

    if (!id || !suma) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Один або декілька полів не заповнено");
    }

    const existUser = await db.query.users.findFirst({ where: eq(users.id, id) });

    if (!existUser) {
      throw UserNotFoundError();
    }

    await db.insert(transactions).values({
      title: "Поповнення рахунку",
      category: "Deposit",
      suma,
      user: id,
    });

    const user = await db
      .update(users)
      .set({
        balance: sql`balance + ${suma}`,
      })
      .where(eq(users.id, id))
      .returning();

    if (user[0]?.telegramID) {
      await sendDepositNotification(user[0], suma);
    }
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
