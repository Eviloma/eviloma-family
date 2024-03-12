import { Grid } from '@mantine/core';
import React from 'react';

import BalanceCard from '@/components/cards/BalanceCard';
import ProfileCard from '@/components/cards/ProfileCard';
import SubscriptionsCard from '@/components/cards/SubscriptionsCard';
import TelegramCard from '@/components/cards/TelegramCard';
import TransactionsCard from '@/components/cards/TransactionsCard';
import { getLogtoContext } from '@/utils/logto';

export default async function DashboardPage() {
  const { userInfo } = await getLogtoContext({ fetchUserInfo: true });
  return (
    <Grid grow>
      <ProfileCard userInfo={userInfo!} />
      <BalanceCard />
      <TelegramCard />
      <SubscriptionsCard />
      <TransactionsCard />
    </Grid>
  );
}
