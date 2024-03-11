import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { handleSignIn } from '@/utils/logto';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  await handleSignIn(searchParams);

  redirect('/');
}
