"use client";

import "dayjs/locale/uk";

import { Group, Stack } from "@mantine/core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { forEach } from "lodash";
import React, { useMemo } from "react";

import TransactionsTable from "@/components/transactions/TransactionsTable";
import type Transaction from "@/types/transaction";
import type User from "@/types/user";
import QueryRequest from "@/utils/query-request";

import AddTransactionButton from "./AddTransactionButton";

interface IProps {
  user: User;
}

export default function UserTransactionTab({ user }: IProps) {
  const { data, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery<{
    data: Transaction[];
    meta: { page: number; total: number };
  }>({
    queryKey: [`user-${user.id}-transactions`],
    queryFn: ({ pageParam }) =>
      QueryRequest({
        link: `/api/users/${user.id}/transactions?page=${pageParam}`,
        method: "GET",
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
    <Stack gap="sm" w="100%">
      <Group justify="end">
        <AddTransactionButton id={user.id} />
      </Group>
      <TransactionsTable data={allData} isFetching={isFetching || isFetchingNextPage} fetchNextPage={fetchNextPage} />
    </Stack>
  );
}
