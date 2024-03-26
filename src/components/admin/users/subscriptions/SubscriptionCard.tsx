import { Box, Card, Flex, Group, NumberFormatter, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { CalendarClock, Coins } from 'lucide-react';
import React from 'react';

import Subscription from '@/types/subscription';
import User from '@/types/user';

import { getCategoryData } from '../../CategoryItem';
import RemoveSusbcription from './RemoveSubscription';

interface IProps {
  user: User;
  subscription: Subscription;
}

export default function SubscriptionCard({ user, subscription }: IProps) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder className='overflow-hidden'>
      <Group wrap='nowrap' align='center' gap='sm'>
        <Box bg='dark.7' p='xs' className='flex items-center justify-center rounded-full'>
          {getCategoryData(subscription.category).icon}
        </Box>
        <Stack gap='1px' justify='space-around' w='100%'>
          <Title order={3} size='h5'>
            {subscription.title}
          </Title>
          <Box w='80%'>
            <Text c='dimmed' truncate size='sm'>
              {subscription.id}
            </Text>
          </Box>
        </Stack>
      </Group>

      <Flex align='center' gap='sm' mt='md'>
        <CalendarClock />
        <Text>{`Оплата ${dayjs().to(subscription.date)}`}</Text>
      </Flex>

      <Flex align='center' gap='sm' mt='md'>
        <Coins />
        <NumberFormatter
          value={subscription.price / 100}
          prefix='Ціна: '
          suffix=' ₴/міс.'
          thousandSeparator=' '
          decimalScale={2}
          fixedDecimalScale
        />
      </Flex>

      <Box mt='md'>
        <RemoveSusbcription user={user} subscription={subscription} />
      </Box>
    </Card>
  );
}
