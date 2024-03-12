/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { getLogtoContext } from '@/utils/logto';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userInfo } = await getLogtoContext({ fetchUserInfo: true });

  if (!isAuthenticated) {
    return <div>Not authorized</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
