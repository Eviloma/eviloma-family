import { type NextRequest, NextResponse } from "next/server";

import db from "@/db";
import { users } from "@/db/schema";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";
import { SCOPES } from "@/utils/consts";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await fetchUserInfo(SCOPES.admin);
    const { data } = await req.json();
    await db
      .update(users)
      .set({
        paymentLink: data,
      })
      .where(eq(users.id, params.id));

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
