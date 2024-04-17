import { eq } from "drizzle-orm";
import { map } from "lodash";
import { type NextRequest, NextResponse } from "next/server";

import { UserNotFoundError } from "@/classes/ApiError";
import db from "@/db";
import { users } from "@/db/schema";
import type API from "@/types/api";
import type Subscription from "@/types/subscription";
import apiErrorHandler from "@/utils/api/api-error-handler";
import fetchUserInfo from "@/utils/api/authorization-check";
import { SCOPES } from "@/utils/consts";

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
      throw UserNotFoundError();
    }

    return NextResponse.json(map(user.subscriptions, "subscription"), { status: 200 });
  } catch (err) {
    return apiErrorHandler(req, err);
  }
}
