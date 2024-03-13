import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/db';
import { users } from '@/db/schema';
import API from '@/types/api';
import User from '@/types/user';
import ApiErrorHandler from '@/utils/api/api-error-handler';
import FetchUserInfo from '@/utils/api/authorization-check';

export async function GET(req: NextRequest): API<User> {
  try {
    const userInfo = await FetchUserInfo();

    const userExists = !!(await db.query.users.findFirst({ where: eq(users.id, userInfo.sub) }));

    if (!userExists) {
      await db.insert(users).values({
        id: userInfo.sub,
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userInfo.sub),
      with: {
        subscriptions: {
          columns: {},
          with: {
            subscription: true,
          },
        },
        transactions: {
          limit: 5,
        },
      },
    });

    if (!user) {
      throw new Error('Unknown error');
    }

    return NextResponse.json({
      ...user,
      email: userInfo.email!,
      username: userInfo.username ?? null,
      avatar: userInfo.picture ?? null,
    });
  } catch (error) {
    return ApiErrorHandler(req, error);
  }
}
