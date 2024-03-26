import { eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { map } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { ApiErrorClass } from '@/classes/ApiError';
import db from '@/db';
import { users } from '@/db/schema';
import API from '@/types/api';
import Subscription from '@/types/subscription';
import apiErrorHandler from '@/utils/api/api-error-handler';
import fetchUserInfo from '@/utils/api/authorization-check';
import { SCOPES } from '@/utils/consts';

export async function GET(req: NextRequest, { params }: { params: { id: string } }): API<Subscription[]> {
  try {
    await fetchUserInfo(SCOPES.admin);

    const user = await db.query.users.findFirst({
      where: eq(users.id, params.id),
      with: {
        subscriptions: {
          columns: {},
          with: {
            subscription: true,
          },
        },
      },
    });

    if (!user) {
      throw new ApiErrorClass(StatusCodes.NOT_FOUND, 'Користувача не знайдено');
    }

    return NextResponse.json(map(user.subscriptions, 'subscription'), { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
