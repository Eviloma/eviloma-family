"use client";

import { useQuery } from "@tanstack/react-query";

import type Transaction from "@/types/transaction";
import QueryRequest from "@/utils/query-request";

import { useSearchParams } from "next/navigation";
import TransactionsTable from "./transactions/TransactionsTable";

export default function UserTransactions() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, isFetching } = useQuery<{
    data: Transaction[];
    meta: { page: number; total: number; totalPage: number };
  }>({
    queryKey: ["user-transactions", page],
    queryFn: () => QueryRequest({ link: `/api/user/transactions?page=${page}`, method: "GET" }),
  });

  return (
    <TransactionsTable
      data={data?.data ?? []}
      isLoading={isLoading || isFetching}
      totalRecords={data?.meta.total ?? 0}
    />
  );
}
