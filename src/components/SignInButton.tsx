// ! Only For test

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { signIn } from '@/utils/logto';

function SignIn() {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signIn();

    router.push(redirectUrl);
  };

  return (
    <button type='button' onClick={handleClick}>
      Sign In
    </button>
  );
}

export default SignIn;
