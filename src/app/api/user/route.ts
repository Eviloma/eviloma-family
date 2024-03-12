import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/db';
import { users } from '@/db/schema';
import ApiErrorHandler from '@/utils/api/api-error-handler';
import FetchUserInfo from '@/utils/api/authorization-check';

export async function GET(req: NextRequest) {
  try {
    const userInfo = await FetchUserInfo();

    const userExists = !!(await db.query.users.findFirst({}));

    if (!userExists) {
      await db.insert(users).values({
        id: userInfo.sub,
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userInfo.sub),
      with: {
        subscriptions: {
          with: {
            subscription: true,
          },
        },
        transactions: {
          limit: 5,
        },
      },
    });

    return NextResponse.json({
      ...user,
      email: userInfo.email!,
      username: userInfo.username ?? null,
      avatar: userInfo.picture ?? null,
      balance: user!.balance / 100,
    });
  } catch (error) {
    return ApiErrorHandler(req, error);
  }
}
