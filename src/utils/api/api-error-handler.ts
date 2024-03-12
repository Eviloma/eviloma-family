import { isError } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from '@/app/classes/ApiError';

export default function ApiErrorHandler(_: NextRequest, error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json({ error_message: error.message }, { status: error.code });
  }
  if (isError(error)) {
    return NextResponse.json({ error_message: error.message }, { status: 500 });
  }
  return NextResponse.json({ error_message: 'Unknown error' }, { status: 500 });
}
