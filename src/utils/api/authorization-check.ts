import { ErrorFetchingUserInfo, UnauthorizedError } from '@/app/classes/ApiError';

import { getLogtoContext } from '../logto';

export default async function FetchUserInfo() {
  const { isAuthenticated, userInfo } = await getLogtoContext({ fetchUserInfo: true });
  if (!isAuthenticated) {
    throw UnauthorizedError;
  }

  if (!userInfo) {
    throw ErrorFetchingUserInfo;
  }

  return userInfo;
}
