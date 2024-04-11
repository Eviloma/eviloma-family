'use client';

import 'dayjs/locale/uk';

import { Card, GridCol, Skeleton, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { map } from 'lodash';
import { Boxes } from 'lucide-react';
import React from 'react';

import { ExtendedUser } from '@/types/user';
import QueryRequest from '@/utils/query-request';

import CardTitle from './items/CardTitle';
import SubscriptionItem from './items/SubscriptionItem';

dayjs.extend(relativeTime);
dayjs.locale('uk');

export default function SubscriptionsCard() {
  const { data, isLoading } = useQuery<ExtendedUser>({
    queryKey: ['user'],
    queryFn: () =>
      QueryRequest({
        link: '/api/user',
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
        <Skeleton radius='md' h='100%' mih='250px' />
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
      <Card shadow='sm' padding='lg' radius='md' h='100%' withBorder>
        <Card.Section withBorder inheritPadding py='xs'>
          <CardTitle icon={<Boxes />} title='Підписки' />
        </Card.Section>

        <Stack gap='xs' mt='md' h='100%'>
          {data.subscriptions.length >= 1 ? (
            map(data.subscriptions, ({ subscription }) => (
              <SubscriptionItem key={subscription.id} subscription={subscription} />
            ))
          ) : (
            <Text ta='center'>Підписок не знайдено</Text>
          )}
        </Stack>
      </Card>
    </GridCol>
  );
}
