import React from 'react';

import SignIn from '@/components/SignInButton';
import SignOut from '@/components/SignOutButton';
import { getLogtoContext } from '@/utils/logto';

export default async function Home() {
  const { isAuthenticated, claims, accessToken, scopes, organizationTokens, userInfo } = await getLogtoContext({
    getAccessToken: true,
    getOrganizationToken: true,
    fetchUserInfo: true,
    resource: 'http://localhost:3000/api',
  });

  return (
    <div className='flex flex-col gap-2'>
      <div>{`isAuthenticated: ${isAuthenticated}`}</div>
      <div>{`claims: ${JSON.stringify(claims)}`}</div>
      <div>{`scopes: ${JSON.stringify(scopes)}`}</div>
      <div>{`organizationTokens: ${JSON.stringify(organizationTokens)}`}</div>
      <div>{`userInfo: ${JSON.stringify(userInfo)}`}</div>
      <div>{`accessToken: ${JSON.stringify(accessToken)}`}</div>
      <SignIn />
      <SignOut />
    </div>
  );
}
