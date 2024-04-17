import { type NextRequest, NextResponse } from "next/server";

import db from "@/db";
import { users } from "@/db/schema";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";
import { SCOPES } from "@/utils/consts";

export async function POST(req: NextRequest) {
  try {
    await fetchUserInfo(SCOPES.admin);
    const { data } = await req.json();
    await db.update(users).set({
      paymentLink: data,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
