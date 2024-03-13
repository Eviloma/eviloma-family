import { LogtoError } from '@logto/node';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { handleSignIn } from '@/utils/logto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    await handleSignIn(searchParams);
  } catch (error) {
    if (error instanceof LogtoError) {
      redirect(`/?error=${error.code}`);
    }
  }
  redirect('/');
}
