'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { signOut } from '@/utils/logto';

function SignOut() {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signOut();

    router.push(redirectUrl);
  };

  return (
    <button type='button' onClick={handleClick}>
      Sign Out
    </button>
  );
}

export default SignOut;
