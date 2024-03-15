import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import { includes, join } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { ApiErrorClass } from '@/app/classes/ApiError';
import db from '@/db';
import { subscriptions } from '@/db/schema';
import apiErrorHandler from '@/utils/api/api-error-handler';
import fetchUserInfo from '@/utils/api/authorization-check';
import { SCOPES, SUBSCRIPTION_CATEGORIES } from '@/utils/consts';

export async function GET() {
  try {
    await fetchUserInfo(SCOPES.admin);
    const subscriptionsData = await db.select().from(subscriptions).orderBy(subscriptions.title);
    return NextResponse.json(subscriptionsData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await fetchUserInfo(SCOPES.admin);
    const { title, category, price, date } = await req.json();

    if (!title || title.length < 3) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Назва підписки не може бути менше 3 символів');
    }

    if (!category || !includes(SUBSCRIPTION_CATEGORIES, category)) {
      throw new ApiErrorClass(
        StatusCodes.BAD_REQUEST,
        'Невірна категорія підписки',
        `Дозволені категорії: ${join(SUBSCRIPTION_CATEGORIES, ', ')}`
      );
    }

    if (!price || Number.isNaN(price) || price < 0.01) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Ціна підписки не може бути менше 0.01 ₴');
    }

    if (!date) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Дата підписки не може бути порожньою');
    }

    if (!dayjs(date).isValid()) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Не вдалось перевірити дату підписки');
    }

    if (dayjs(date).isBefore(dayjs().subtract(1, 'day'))) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Дата підписки не може бути в минулому');
    }

    const subscription = await db
      .insert(subscriptions)
      .values({
        title,
        category,
        price: price * 100,
        date: dayjs(date).toDate(),
      })
      .returning();

    if (!subscription[0]) {
      throw new ApiErrorClass(StatusCodes.INTERNAL_SERVER_ERROR, 'Помилка створення підписки');
    }

    return NextResponse.json({});
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
