import { NextResponse } from 'next/server';

export type ApiError = {
  error_message: string;
};

type API<T> = Promise<NextResponse<T | ApiError>>;

export default API;
