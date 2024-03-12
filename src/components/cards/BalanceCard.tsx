'use client';

import { Button, Card, GridCol, NumberFormatter, Skeleton, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Coins, CreditCard } from 'lucide-react';
import React from 'react';

import getUser from '@/store/get-user';
import User from '@/types/user';

import CardTitle from './items/CardTitle';

export default function BalanceCard() {
  const { data, isLoading } = useQuery<User>({ queryKey: ['user'], queryFn: getUser });

  if (isLoading || !data) {
    return (
      <GridCol
        span={{
          base: 12,
          md: 6,
          lg: 4,
        }}
      >
        <Skeleton radius='md' h='100%' />
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
          <CardTitle icon={<Coins />} title='Баланс' />
        </Card.Section>

        <Stack gap='md' mt='md' justify='space-between' h='100%'>
          <Stack gap='sm' my='auto'>
            <Text size='36px' ta='center' fw={600} c={data.balance < 0 ? 'red' : ''}>
              <NumberFormatter
                suffix=' ₴'
                value={data.balance}
                thousandSeparator=' '
                decimalScale={2}
                fixedDecimalScale
              />
            </Text>

            <Text ta='center' c='dimmed' size='sm'>
              Для поповнення балансу натисніть кнопку нижче. Для автоматичного зарахування балансу ви повинні ввести
              свій ID в поле &#34;Коментар&#34;. Якщо ви не введете свій ID, зарахування балансу відбудеться від 5
              хвилин до 72 годин.
            </Text>
          </Stack>

          <Button fullWidth leftSection={<CreditCard />} variant='light'>
            Поповнити баланс
          </Button>
        </Stack>
      </Card>
    </GridCol>
  );
}
