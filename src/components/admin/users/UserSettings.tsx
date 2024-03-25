'use client';

import { Box, Center, Skeleton, Tabs } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Boxes, ReceiptText, UserRound, UserRoundCog } from 'lucide-react';
import React from 'react';

import ErrorAlert from '@/components/alerts/ErrorAlert';
import User from '@/types/user';
import QueryRequest from '@/utils/query-request';

import UserProfileTab from './profile/UserProfileTab';
import UserSubscriptionsTab from './subscriptions/UserSubscriptionsTab';

interface IProps {
  id: string;
}

export default function UserSettings({ id }: IProps) {
  const { data, error, isLoading } = useQuery<User>({
    queryKey: [`user-${id}`],
    queryFn: () =>
      QueryRequest({
        link: `/api/users/${id}`,
        method: 'GET',
      }),
  });

  if (isLoading) {
    return <Skeleton animate w='100%' h='350px' />;
  }

  if (!data) {
    return (
      <Center>
        <ErrorAlert title='Помилка' description={error?.message ?? 'Помилка сервера'} />
      </Center>
    );
  }

  return (
    <Tabs defaultValue='profile' orientation='vertical' w='100%' mih='750px'>
      <Tabs.List>
        <Tabs.Tab value='-' leftSection={<UserRound />} disabled>
          {data.username ?? data.email}
        </Tabs.Tab>
        <Tabs.Tab value='profile' leftSection={<UserRoundCog />}>
          Профіль
        </Tabs.Tab>
        <Tabs.Tab value='subscriptions' leftSection={<Boxes />}>
          Підписки
        </Tabs.Tab>
        <Tabs.Tab value='transactions' leftSection={<ReceiptText />}>
          Транзакції
        </Tabs.Tab>
      </Tabs.List>

      <Box pl='sm' w='100%'>
        <UserProfileTab user={data} />
        <Tabs.Panel value='subscriptions'>
          <UserSubscriptionsTab user={data} />
        </Tabs.Panel>
        <Tabs.Panel value='transactions'>Settings tab content</Tabs.Panel>
      </Box>
    </Tabs>
  );
}
