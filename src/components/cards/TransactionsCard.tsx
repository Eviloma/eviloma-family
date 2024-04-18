"use client";

import { ActionIcon, Card, GridCol, Skeleton, Stack, Text, Tooltip } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { map } from "lodash";
import { FileStack, ReceiptText } from "lucide-react";
import Link from "next/link";

import type { ExtendedUser } from "@/types/user";
import QueryRequest from "@/utils/query-request";

import CardTitle from "./items/CardTitle";
import TransactionItem from "./items/TransactionItem";

export default function TransactionsCard() {
  const { data, isLoading } = useQuery<ExtendedUser>({
    queryKey: ["user"],
    queryFn: () =>
      QueryRequest({
        link: "/api/user",
      }),
  });

  if (isLoading || !data) {
    return (
      <GridCol
        span={{
          base: 12,
          md: 6,
          lg: 4,
        }}
      >
        <Skeleton radius="md" h="100%" mih="250px" />
      </GridCol>
    );
  }
  return (
    <GridCol
      span={{
        base: 12,
        md: 6,
        lg: 4,
      }}
    >
      <Card shadow="sm" padding="lg" radius="md" h="100%" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <CardTitle icon={<ReceiptText />} title="Транзакції">
            <Tooltip label="Всі транзакції" withArrow events={{ hover: true, focus: true, touch: false }}>
              <ActionIcon component={Link} href="/dashboard/transactions" variant="light" size="lg">
                <FileStack />
              </ActionIcon>
            </Tooltip>
          </CardTitle>
        </Card.Section>

        <Stack gap="xs" mt="md" justify="space-between" h="100%">
          {data.transactions.length >= 1 ? (
            map(data.transactions, (transaction) => <TransactionItem key={transaction.id} transaction={transaction} />)
          ) : (
            <Text ta="center">Транзакцій не знайдено</Text>
          )}
        </Stack>
      </Card>
    </GridCol>
  );
}
