/* eslint-disable lodash/collection-method-value */
import { eq, lte, sql } from 'drizzle-orm';
import { map } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { ForbiddenError } from '@/classes/ApiError';
import db from '@/db';
import { subscriptions as subscriptionsSchema, transactions, users } from '@/db/schema';
import apiErrorHandler from '@/utils/api/api-error-handler';
import sendSubPaymentNotification from '@/utils/telegram/sub-payment';

interface Log {
  user: {
    id: string;
    username: string | null;
    email: string;
  };
  subscription: {
    id: string;
    title: string;
  };
  telegram: boolean;
  transactionId: string;
}

export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');

    if (!authorization || authorization !== `Bearer ${process.env.PAYMENT_API_KEY}`) {
      throw ForbiddenError;
    }

    const logs = await db.transaction(async (tx) => {
      const subscriptions = await tx.query.subscriptions.findMany({
        where: lte(subscriptionsSchema.date, new Date()),
        with: {
          users: {
            columns: {},
            with: {
              user: true,
            },
          },
        },
      });

      return Promise.all(
        map(subscriptions, async (subscription) => {
          return Promise.all(
            map(subscription.users, async ({ user }) => {
              const transaction = await tx
                .insert(transactions)
                .values({
                  title: `Автоплатіж за ${subscription.title}`,
                  suma: -subscription.price,
                  category: subscription.category,
                  user: user.id,
                })
                .returning();
              await tx
                .update(users)
                .set({ balance: sql`balance - ${subscription.price}` })
                .where(eq(users.id, user.id));
              if (user.telegramID) {
                await sendSubPaymentNotification(user, subscription);
              }
              return {
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
                subscription: {
                  id: subscription.id,
                  title: subscription.title,
                },
                telegram: !!user.telegramID,
                transactionId: transaction[0]?.id ?? '',
              } as Log;
            })
          );
        })
      );
    });
    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(req, error);
  }
}
