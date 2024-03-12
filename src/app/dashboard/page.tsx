import { Grid } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import React from 'react';

import BalanceCard from '@/components/cards/BalanceCard';
import ProfileCard from '@/components/cards/ProfileCard';
import SubscriptionsCard from '@/components/cards/SubscriptionsCard';
import TelegramCard from '@/components/cards/TelegramCard';
import TransactionsCard from '@/components/cards/TransactionsCard';
import Hydrate from '@/components/Hydrate';
import getUser from '@/store/get-user';
import { getLogtoContext } from '@/utils/logto';

export default async function DashboardPage() {
  const { userInfo } = await getLogtoContext({ fetchUserInfo: true });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Grid grow>
        <ProfileCard userInfo={userInfo!} />
        <BalanceCard />
        <TelegramCard />
        <SubscriptionsCard />
        <TransactionsCard />
      </Grid>
    </Hydrate>
  );
}
