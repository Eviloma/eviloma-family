import { Title } from '@mantine/core';
import { Metadata } from 'next/types';
import React from 'react';

import CreateSubscriptionButton from '@/components/admin/subscriptions/CreateSubscriptionButton';
import SubscriptionsList from '@/components/admin/subscriptions/SubscriptionsList';

const PAGE_TITLE = 'Управління підписками';
export const metadata: Metadata = {
  title: PAGE_TITLE,
  openGraph: {
    title: PAGE_TITLE,
  },
};

export default function Page() {
  return (
    <>
      <Title ta='center' mb='md'>
        Підписки
      </Title>
      <CreateSubscriptionButton />
      <SubscriptionsList />
    </>
  );
}
