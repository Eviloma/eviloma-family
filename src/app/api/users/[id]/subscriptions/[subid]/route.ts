import { and, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { type NextRequest, NextResponse } from "next/server";

import { ApiErrorClass } from "@/classes/ApiError";
import db from "@/db";
import { userOnSubscriptions } from "@/db/schema";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";
import { SCOPES } from "@/utils/consts";

export async function PUT(req: NextRequest, { params }: { params: { id: string; subid: string } }) {
  try {
    await fetchUserInfo(SCOPES.admin);
    await db
      .insert(userOnSubscriptions)
      .values({
        userId: params.id,
        subscriptionId: params.subid,
      })
      .catch((error) => {
        if ("code" in error && error.code === "23505") {
          throw new ApiErrorClass(StatusCodes.CONFLICT, "Підписка вже додана раніше");
        }
        throw error;
      });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string; subid: string } }) {
  try {
    await fetchUserInfo(SCOPES.admin);
    await db
      .delete(userOnSubscriptions)
      .where(and(eq(userOnSubscriptions.userId, params.id), eq(userOnSubscriptions.subscriptionId, params.subid)));
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
