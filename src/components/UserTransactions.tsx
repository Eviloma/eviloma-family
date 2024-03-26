'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { forEach } from 'lodash';
import React, { useMemo } from 'react';

import Transaction from '@/types/transaction';
import QueryRequest from '@/utils/query-request';

import TransactionsTable from './transactions/TransactionsTable';

export default function UserTransactions() {
  const { data, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery<{
    data: Transaction[];
    meta: { page: number; total: number };
  }>({
    queryKey: [`user-transactions`],
    queryFn: ({ pageParam }) =>
      QueryRequest({
        link: `/api/user/transactions?page=${pageParam}`,
        method: 'GET',
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page + 1,
  });

  const allData = useMemo(() => {
    if (!data || !data.pages || !data.pages[0]) {
      return [];
    }

    let result: Transaction[] = [];

    forEach(data.pages, (page) => {
      result = [...result, ...(page?.data ?? [])];
    });

    return result;
  }, [data]);
  return (
    <TransactionsTable data={allData} isFetching={isFetching || isFetchingNextPage} fetchNextPage={fetchNextPage} />
  );
}
