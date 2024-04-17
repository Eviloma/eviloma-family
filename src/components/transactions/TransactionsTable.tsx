"use client";

import { Group, NumberFormatter, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { DataTable, type DataTableColumn } from "mantine-datatable";
import React from "react";

import type Transaction from "@/types/transaction";

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
  isFetching: boolean;
  fetchNextPage: () => void;
}

export default function TransactionsTable({ data, isFetching, fetchNextPage }: IProps) {
  return (
    <DataTable
      noHeader
      columns={colums}
      records={data}
      minHeight={150}
      fetching={isFetching}
      onScrollToBottom={fetchNextPage}
      noRecordsText="Транзакції відсутні"
    />
  );
}
