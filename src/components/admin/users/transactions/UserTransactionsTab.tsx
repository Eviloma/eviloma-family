"use client";

import "dayjs/locale/uk";

import { Group, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import TransactionsTable from "@/components/transactions/TransactionsTable";
import type Transaction from "@/types/transaction";
import type User from "@/types/user";
import QueryRequest from "@/utils/query-request";

import { useSearchParams } from "next/navigation";
import AddTransactionButton from "./AddTransactionButton";

interface IProps {
  user: User;
}

export default function UserTransactionTab({ user }: IProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, isFetching } = useQuery<{
    data: Transaction[];
    meta: { page: number; total: number; totalPage: number };
  }>({
    queryKey: [`user-${user.id}-transactions`, page],
    queryFn: () => QueryRequest({ link: `/api/users/${user.id}/transactions?page=${page}`, method: "GET" }),
  });

  return (
    <Stack gap="sm" w="100%">
      <Group justify="end">
        <AddTransactionButton id={user.id} />
      </Group>
      <TransactionsTable
        data={data?.data ?? []}
        isLoading={isLoading || isFetching}
        totalRecords={data?.meta.total ?? 0}
      />
    </Stack>
  );
}
