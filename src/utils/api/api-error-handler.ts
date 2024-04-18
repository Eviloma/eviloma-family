import { isError } from "lodash";
import { type NextRequest, NextResponse } from "next/server";

import { ApiErrorClass } from "@/classes/ApiError";
import type { ApiError } from "@/types/api";

export default function apiErrorHandler(_: NextRequest, error: unknown): NextResponse<ApiError> {
  if (error instanceof ApiErrorClass) {
    return NextResponse.json(
      {
        error_message: error.message,
        details: error.details,
      },
      { status: error.code },
    );
  }
  if (isError(error)) {
    return NextResponse.json({ error_message: error.message }, { status: 500 });
  }
  return NextResponse.json({ error_message: "Unknown error" }, { status: 500 });
}
