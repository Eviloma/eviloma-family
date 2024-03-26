import { count, desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/db';
import { transactions as transactionsSchema } from '@/db/schema';
import { ApiWithMeta } from '@/types/api';
import Transaction from '@/types/transaction';
import apiErrorHandler from '@/utils/api/api-error-handler';
import fetchUserInfo from '@/utils/api/authorization-check';

export async function GET(req: NextRequest): ApiWithMeta<Transaction[] | null> {
  try {
    const user = await fetchUserInfo();

    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get('page') ?? '1', 10) ?? 1;

    const countResult = await db
      .select({ count: count() })
      .from(transactionsSchema)
      .where(eq(transactionsSchema.user, user.sub));
    const transactions = await db
      .select()
      .from(transactionsSchema)
      .where(eq(transactionsSchema.user, user.sub))
      .orderBy(desc(transactionsSchema.date))
      .limit(10)
      .offset((page - 1) * 10);

    return NextResponse.json(
      { data: transactions.length === 0 ? null : transactions, meta: { total: countResult[0]?.count ?? 0, page } },
      { status: 200 }
    );
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
