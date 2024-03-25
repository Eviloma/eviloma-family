/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { getLogtoContext } from '@/utils/logto';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await getLogtoContext();

  if (!isAuthenticated) {
    return <div>Not authorized</div>;
  }
  return <>{children}</>;
}
