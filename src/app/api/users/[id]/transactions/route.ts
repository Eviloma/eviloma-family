import dayjs from "dayjs";
import { count, desc, eq, sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { includes, join } from "lodash";
import { type NextRequest, NextResponse } from "next/server";

import { ApiErrorClass } from "@/classes/ApiError";
import db from "@/db";
import { transactions as transactionsSchema, users } from "@/db/schema";
import type { ApiWithMeta } from "@/types/api";
import type Transaction from "@/types/transaction";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";
import { SCOPES, TRANSACTION_CATEGORIES } from "@/utils/consts";

export async function GET(req: NextRequest, { params }: { params: { id: string } }): ApiWithMeta<Transaction[] | null> {
  try {
    await fetchUserInfo(SCOPES.admin);

    const { searchParams } = req.nextUrl;

    const page = Number.parseInt(searchParams.get("page") ?? "1", 10) ?? 1;

    const countResult = await db
      .select({ count: count() })
      .from(transactionsSchema)
      .where(eq(transactionsSchema.user, params.id));
    const transactions = await db
      .select()
      .from(transactionsSchema)
      .where(eq(transactionsSchema.user, params.id))
      .orderBy(desc(transactionsSchema.date))
      .limit(10)
      .offset((page - 1) * 10);

    return NextResponse.json(
      { data: transactions.length === 0 ? null : transactions, meta: { total: countResult[0]?.count ?? 0, page } },
      { status: 200 },
    );
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await fetchUserInfo(SCOPES.admin);
    const { title, category, suma, date } = await req.json();

    if (!title || title.length < 3) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Заголовок транзакції не може бути менше 3 символів");
    }

    if (!category || !includes(TRANSACTION_CATEGORIES, category)) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Невірна категорія транзакції", {
        message: `Дозволені категорії: ${join(TRANSACTION_CATEGORIES, ", ")}`,
      });
    }

    if (!suma || Number.isNaN(suma)) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Сума транзакції не заповнена або не є числом");
    }

    if (!date) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Дата транзакції не може бути порожньою");
    }

    if (!dayjs(date).isValid()) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, "Не вдалось перевірити дату транзакції");
    }

    const transaction = await db
      .insert(transactionsSchema)
      .values({
        user: params.id,
        title,
        category,
        suma: suma * 100,
        date: dayjs(date).toDate(),
      })
      .returning();

    if (!transaction[0]) {
      throw new ApiErrorClass(StatusCodes.INTERNAL_SERVER_ERROR, "Помилка створення транзакції");
    }

    await db.update(users).set({
      balance: sql`balance + ${suma * 100}`,
    });

    return NextResponse.json({ transaction: transaction[0] }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
