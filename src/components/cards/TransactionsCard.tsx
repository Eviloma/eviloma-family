'use client';

import { ActionIcon, Card, Divider, GridCol, Skeleton, Stack, Tooltip } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { FileStack, ReceiptText } from 'lucide-react';
import React from 'react';

import { ExtendedUser } from '@/types/user';
import QueryRequest from '@/utils/query-request';

import CardTitle from './items/CardTitle';
import TransactionItem from './items/TransactionItem';

export default function TransactionsCard() {
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
          <CardTitle icon={<ReceiptText />} title='Транзакції'>
            <Tooltip label='Всі транзакції' withArrow events={{ hover: true, focus: true, touch: false }}>
              <ActionIcon variant='light' size='lg'>
                <FileStack />
              </ActionIcon>
            </Tooltip>
          </CardTitle>
        </Card.Section>

        <Stack gap='xs' mt='md' justify='space-between' h='100%'>
          <TransactionItem />
          <Divider />
          <TransactionItem />
          <Divider />
          <TransactionItem />
          <Divider />
          <TransactionItem />
          <Divider />
          <TransactionItem />
        </Stack>
      </Card>
    </GridCol>
  );
}
