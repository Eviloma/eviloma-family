"use client";

import { Box, Center, Skeleton, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Boxes, ReceiptText, UserRoundCog } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import type User from "@/types/user";
import QueryRequest from "@/utils/query-request";

import UserProfileTab from "./profile/UserProfileTab";
import UserSubscriptionsTab from "./subscriptions/UserSubscriptionsTab";
import UserTransactionTab from "./transactions/UserTransactionsTab";

interface IProps {
  id: string;
}

export default function UserSettings({ id }: IProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "profile";

  const router = useRouter();

  const { data, error, isLoading } = useQuery<User>({
    queryKey: [`user-${id}`],
    queryFn: () =>
      QueryRequest({
        link: `/api/users/${id}`,
        method: "GET",
      }),
  });

  if (isLoading) {
    return <Skeleton animate w="100%" h="350px" />;
  }

  if (!data) {
    return (
      <Center>
        <ErrorAlert title="Помилка" description={error?.message ?? "Помилка сервера"} />
      </Center>
    );
  }

  return (
    <Tabs
      defaultValue="profile"
      orientation="horizontal"
      w="100%"
      mih="750px"
      value={tab}
      onChange={(value) => router.push(`/admin/users/${id}?tab=${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="profile" leftSection={<UserRoundCog />}>
          <span className="hidden md:block">Профіль</span>
        </Tabs.Tab>
        <Tabs.Tab value="subscriptions" leftSection={<Boxes />}>
          <span className="hidden md:block">Підписки</span>
        </Tabs.Tab>
        <Tabs.Tab value="transactions" leftSection={<ReceiptText />}>
          <span className="hidden md:block">Транзакції</span>
        </Tabs.Tab>
      </Tabs.List>

      <Box pl="sm" w="100%" mt="sm">
        <UserProfileTab user={data} />
        <Tabs.Panel value="subscriptions">
          <UserSubscriptionsTab user={data} />
        </Tabs.Panel>
        <Tabs.Panel value="transactions">
          <UserTransactionTab user={data} />
        </Tabs.Panel>
      </Box>
    </Tabs>
  );
}
