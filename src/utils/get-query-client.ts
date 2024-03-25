import { QueryClient } from '@tanstack/react-query';
import { includes } from 'lodash';

import ErrorWithCode from '@/app/classes/ErrorWithCode';

import { DONT_RETRY_STATUS_CODES, MAX_RETRY_ATTEMPTS } from './consts';

let browserQueryClient: QueryClient | undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 1000,
        retry(failureCount, err) {
          if (failureCount > MAX_RETRY_ATTEMPTS) {
            return false;
          }

          return !(err instanceof ErrorWithCode && includes(DONT_RETRY_STATUS_CODES, err.code));
        },
      },
    },
  });
}

export default function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
