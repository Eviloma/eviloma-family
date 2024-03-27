import { Box, Flex, Group, NumberFormatter, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

import CategoryIcon from '@/components/CategoryIcon';
import Transaction from '@/types/transaction';

interface IProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: IProps) {
  return (
    <Flex gap='xs' direction={{ base: 'column', xs: 'row' }} justify={{ xs: 'space-between' }}>
      <Group gap='sm' align='center' wrap='nowrap' className='overflow-x-hidden'>
        <CategoryIcon category={transaction.category} />
        <Stack gap='2px' justify='space-around' w='100%'>
          <Title order={3} size='h4'>
            {transaction.title}
          </Title>
          <Box w={{ base: '92%', xs: '100%' }}>
            <Text size='xs' c='dimmed' truncate='end'>
              {transaction.id}
            </Text>
          </Box>
        </Stack>
      </Group>
      <Flex
        gap='0px'
        align={{ base: 'center', xs: 'end' }}
        justify={{ base: 'space-between', xs: 'space-around' }}
        direction={{ base: 'row-reverse', xs: 'column' }}
      >
        <Text c={transaction.suma < 0 ? 'red' : 'green'} fw={500} size='lg'>
          <NumberFormatter
            value={transaction.suma / 100}
            prefix={transaction.suma > 0 ? '+' : ''}
            suffix=' ₴'
            thousandSeparator=' '
            decimalScale={2}
            fixedDecimalScale
          />
        </Text>

        <Text c='dimmed' size='sm'>
          {dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}
        </Text>
      </Flex>
    </Flex>
  );
}
