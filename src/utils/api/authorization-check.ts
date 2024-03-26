import { includes } from 'lodash';

import { ErrorFetchingUserInfo, ForbiddenError, UnauthorizedError } from '@/classes/ApiError';

import { getLogtoContext } from '../logto';

export default async function fetchUserInfo(scope?: string) {
  const { isAuthenticated, userInfo, scopes } = await getLogtoContext({ fetchUserInfo: true, getAccessToken: true });
  if (!isAuthenticated) {
    throw UnauthorizedError;
  }

  if (!userInfo) {
    throw ErrorFetchingUserInfo;
  }

  if (scope && !includes(scopes, scope)) {
    throw ForbiddenError;
  }

  return userInfo;
}
