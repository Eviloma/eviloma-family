import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { includes, join } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { ApiErrorClass } from '@/app/classes/ApiError';
import db from '@/db';
import { subscriptions } from '@/db/schema';
import apiErrorHandler from '@/utils/api/api-error-handler';
import fetchUserInfo from '@/utils/api/authorization-check';
import { SCOPES, SUBSCRIPTION_CATEGORIES } from '@/utils/consts';

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await fetchUserInfo(SCOPES.admin);

    const result = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, params.id),
    });

    if (!result) {
      throw new ApiErrorClass(StatusCodes.NOT_FOUND, 'Підписка не знайдена');
    }

    const { title, category, price, date } = await req.json();

    if (title && title.length < 3) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Назва підписки не може бути менше 3 символів');
    }

    if (category && !includes(SUBSCRIPTION_CATEGORIES, category)) {
      throw new ApiErrorClass(
        StatusCodes.BAD_REQUEST,
        'Невірна категорія підписки',
        `Дозволені категорії: ${join(SUBSCRIPTION_CATEGORIES, ', ')}`
      );
    }

    if (price && (Number.isNaN(price) || price < 0.01)) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Ціна підписки не може бути менше 0.01 ₴');
    }

    if (date && !dayjs(date).isValid()) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Не вдалось перевірити дату підписки');
    }

    if (date && dayjs(date).isBefore(dayjs().subtract(1, 'day'))) {
      throw new ApiErrorClass(StatusCodes.BAD_REQUEST, 'Дата підписки не може бути менше за сьогодні');
    }

    // If variable is not defined, use old value
    await db
      .update(subscriptions)
      .set({
        title: title ?? result.title,
        category: category ?? result.category,
        price: price ? price * 100 : result.price,
        date: date ? dayjs(date).toDate() : result.date,
      })
      .where(eq(subscriptions.id, params.id));
    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await fetchUserInfo(SCOPES.admin);
    await db.delete(subscriptions).where(eq(subscriptions.id, params.id));
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
