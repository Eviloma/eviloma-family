"use client";

import { ActionIcon, Avatar, Badge, NumberFormatter, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { DataTable, type DataTableColumn } from "mantine-datatable";
import Link from "next/link";
import React from "react";

import type User from "@/types/user";
import QueryRequest from "@/utils/query-request";

const columns: DataTableColumn<User>[] = [
  {
    accessor: "user",
    title: "Користувач",
    render: (value) => (
      <div className="flex flex-row items-center gap-2">
        <Avatar size={56} src={value.avatar} color="violet" />
        <div className="flex flex-col justify-around">
          <Text fw={600} size="lg">
            {value.username}
          </Text>
          <Text fw={500} c="dimmed">
            {value.email}
          </Text>
          <Text fw={500} c="dimmed" size="sm">
            {value.id}
          </Text>
        </div>
      </div>
    ),
  },
  {
    accessor: "balance",
    title: "Баланс",
    render: (value) => (
      <Text c={value.balance < 0 ? "red.4" : ""}>
        <NumberFormatter
          value={value.balance / 100}
          suffix=" ₴"
          thousandSeparator=" "
          decimalScale={2}
          fixedDecimalScale
        />
      </Text>
    ),
  },
  {
    accessor: "telegram",
    title: "Телеграм",
    render: (value) => (
      <Badge color={value.telegramID ? "violet" : "gray"}>
        {value.telegramUsername ?? value.telegramID ?? "Не прив'язаний"}
      </Badge>
    ),
  },
  {
    accessor: "actions",
    title: "Дії",
    width: "100px",
    textAlign: "right",
    render: (value) => (
      <div className="flex flex-row items-center justify-end gap-2">
        <ActionIcon
          component={Link}
          href={`/admin/users/${value.id}`}
          size="lg"
          p="2px"
          variant="subtle"
          color="yellow"
        >
          <Pencil />
        </ActionIcon>
      </div>
    ),
  },
];

export default function UsersList() {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      QueryRequest({
        link: "/api/users",
        method: "GET",
      }),
  });
  return <DataTable fetching={isLoading} striped mih="150px" columns={columns} records={data ?? []} />;
}
