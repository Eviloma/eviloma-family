"use client";

import "dayjs/locale/uk";

import { Center, Grid, Group, Skeleton, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { map } from "lodash";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import type Subscription from "@/types/subscription";
import type User from "@/types/user";
import QueryRequest from "@/utils/query-request";

import AddSubscriptionButton from "./AddSubscriptionButton";
import SubscriptionCard from "./SubscriptionCard";

interface IProps {
  user: User;
}

dayjs.extend(relativeTime);
dayjs.locale("uk");

export default function UserSubscriptionsTab({ user }: IProps) {
  const { data, error, isLoading } = useQuery<Subscription[]>({
    queryKey: [`user-${user.id}-subscriptions`],
    queryFn: () =>
      QueryRequest({
        link: `/api/users/${user.id}/subscriptions`,
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
    <Stack gap="sm" w="100%">
      <Group justify="end">
        <AddSubscriptionButton id={user.id} userSubscriptionIds={map(data, "id")} />
      </Group>
      <Grid>
        {map(data, (subscription) => (
          <Grid.Col key={subscription.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
            <SubscriptionCard user={user} subscription={subscription} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
