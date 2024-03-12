import React from 'react';

import Hero from '@/components/landing/Hero';
import Mockup from '@/components/landing/Mockup';

export default async function Home() {
  // const { isAuthenticated, claims, accessToken, scopes, organizationTokens, userInfo } = await getLogtoContext({
  //   getAccessToken: true,
  //   getOrganizationToken: true,
  //   fetchUserInfo: true,
  //   resource: 'http://localhost:3000/api',
  // });

  return (
    <>
      <Hero />
      <Mockup />
    </>
  );
}
