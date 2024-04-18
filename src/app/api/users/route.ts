import { type NextRequest, NextResponse } from "next/server";

import db from "@/db";
import { users } from "@/db/schema";
import type API from "@/types/api";
import type User from "@/types/user";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";
import { SCOPES } from "@/utils/consts";

export async function GET(req: NextRequest): API<User[]> {
  try {
    await fetchUserInfo(SCOPES.admin);
    const usersData = await db.select().from(users).orderBy(users.id);
    return NextResponse.json(usersData, { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
