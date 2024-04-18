"use client";

import "dayjs/locale/uk";

import { Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { map } from "lodash";

import type Subscription from "@/types/subscription";
import QueryRequest from "@/utils/query-request";

import SubscriptionCard from "./SubscriptionCard";

dayjs.extend(relativeTime);
dayjs.locale("uk");

const span = {
  base: 12,
  md: 6,
  lg: 4,
  xl: 3,
  "2xl": 2,
};

export default function SubscriptionsList() {
  const { data, isLoading } = useQuery<Subscription[]>({
    queryKey: ["subscriptions"],
    queryFn: () =>
      QueryRequest({
        link: "/api/subscriptions",
        method: "GET",
      }),
  });

  if (isLoading) {
    return (
      <Grid>
        <Grid.Col span={span}>
          <Skeleton radius="md" height="200px" />
        </Grid.Col>
        <Grid.Col span={span}>
          <Skeleton radius="md" height="200px" />
        </Grid.Col>
        <Grid.Col span={span}>
          <Skeleton radius="md" height="200px" />
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Grid>
      {map(data ?? [], (subscription) => (
        <Grid.Col key={subscription.id} span={span}>
          <SubscriptionCard subscription={subscription} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
