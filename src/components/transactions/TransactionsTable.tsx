"use client";

import { Group, NumberFormatter, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { DataTable, type DataTableColumn } from "mantine-datatable";

import type Transaction from "@/types/transaction";

import { useRouter, useSearchParams } from "next/navigation";
import CategoryIcon from "../CategoryIcon";

const colums: DataTableColumn<Transaction>[] = [
  {
    accessor: "title",
    title: "",
    render: ({ title, date, category }) => (
      <Group align="center" wrap="nowrap">
        <CategoryIcon category={category} bg="dark.5" />
        <Stack gap="1px">
          <Title order={3} size="h5" textWrap="nowrap">
            {title}
          </Title>
          <Text c="dimmed" size="xs">
            {dayjs(date).format("DD.MM.YYYY HH:mm:ss")}
          </Text>
        </Stack>
      </Group>
    ),
  },
  {
    accessor: "value",
    title: "",
    textAlign: "right",
    render: ({ suma }) => (
      <Text c={suma > 0 ? "green.3" : "red.3"} className="text-nowrap sm:text-lg md:text-xl">
        <NumberFormatter
          prefix={suma > 0 ? "+" : ""}
          value={suma / 100}
          suffix=" ₴"
          thousandSeparator=" "
          decimalScale={2}
          fixedDecimalScale
        />
      </Text>
    ),
  },
];

interface IProps {
  data: Transaction[];
  isLoading: boolean;
  totalRecords: number;
}

export default function TransactionsTable({ data, isLoading, totalRecords }: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  function getNewSearchParams(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    return `?${params.toString()}`;
  }

  return (
    <DataTable
      noHeader
      columns={colums}
      records={data}
      fetching={isLoading}
      noRecordsText="Транзакції відсутні"
      minHeight={300}
      page={page}
      recordsPerPage={10}
      totalRecords={totalRecords}
      onPageChange={(page) => router.push(getNewSearchParams(page))}
    />
  );
}
