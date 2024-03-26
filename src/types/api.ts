import { NextResponse } from 'next/server';

import Meta from './meta';

export type ApiError = {
  error_message: string;
};

type API<T> = Promise<NextResponse<T | ApiError>>;

type ApiWithMeta<T> = API<{ data: T; meta: Meta }>;

export default API;
export type { ApiWithMeta };
