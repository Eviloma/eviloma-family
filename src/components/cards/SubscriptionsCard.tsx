'use client';

import { Card, Divider, GridCol, Stack } from '@mantine/core';
import { Boxes } from 'lucide-react';
import React from 'react';

import CardTitle from './items/CardTitle';
import SubscriptionItem from './items/SubscriptionItem';

export default function SubscriptionsCard() {
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
          <SubscriptionItem />
          <Divider />
          <SubscriptionItem />
          <Divider />
          <SubscriptionItem />
        </Stack>
      </Card>
    </GridCol>
  );
}
