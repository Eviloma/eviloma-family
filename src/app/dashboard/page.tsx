import { Grid } from '@mantine/core';
import React from 'react';

import BalanceCard from '@/components/cards/BalanceCard';
import ProfileCard from '@/components/cards/ProfileCard';
import SubscriptionsCard from '@/components/cards/SubscriptionsCard';
import TelegramCard from '@/components/cards/TelegramCard';
import TransactionsCard from '@/components/cards/TransactionsCard';

export default function DashboardPage() {
  return (
    <Grid grow>
      <ProfileCard />
      <BalanceCard />
      <TelegramCard />
      <SubscriptionsCard />
      <TransactionsCard />
    </Grid>
  );
}
