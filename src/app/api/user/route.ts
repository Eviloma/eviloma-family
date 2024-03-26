import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/db';
import { transactions, users } from '@/db/schema';
import API from '@/types/api';
import { ExtendedUser } from '@/types/user';
import apiErrorHandler from '@/utils/api/api-error-handler';
import fetchUserInfo from '@/utils/api/authorization-check';

export async function GET(req: NextRequest): API<ExtendedUser> {
  try {
    const userInfo = await fetchUserInfo();

    const userExists = !!(await db.query.users.findFirst({ where: eq(users.id, userInfo.sub) }));

    if (!userExists) {
      await db.insert(users).values({
        id: userInfo.sub,
        username: userInfo.username,
        email: userInfo.email!,
        avatar: userInfo.picture,
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
          orderBy: desc(transactions.date),
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
    return apiErrorHandler(req, error);
  }
}
