/* eslint-disable react/jsx-no-useless-fragment */
import { includes } from 'lodash';
import React from 'react';

import { getLogtoContext } from '@/utils/logto';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { scopes } = await getLogtoContext({ getAccessToken: true });

  if (!includes(scopes, 'admin:family')) {
    return <div>Not authorized</div>;
  }
  return <>{children}</>;
}
