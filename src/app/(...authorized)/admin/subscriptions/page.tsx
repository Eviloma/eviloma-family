import { Title } from '@mantine/core';
import React from 'react';

import CreateSubscriptionButton from '@/components/admin/subscriptions/CreateSubscriptionButton';
import SubscriptionsList from '@/components/admin/subscriptions/SubscriptionsList';

export default function Page() {
  return (
    <>
      <Title order={2} ta='center' mb='md'>
        Підписки
      </Title>
      <CreateSubscriptionButton />
      <SubscriptionsList />
    </>
  );
}
