import { Box, Flex, Group, NumberFormatter, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';

import YoutubeIcon from '@/icons/Youtube';

export default function TransactionItem() {
  const summa = +100;

  return (
    <Flex gap='xs' direction={{ base: 'column', xs: 'row' }} justify={{ xs: 'space-between' }}>
      <Group gap='sm' align='center' wrap='nowrap' className='overflow-x-hidden'>
        <Paper p='xs' radius='xl'>
          <YoutubeIcon fill='#ff0000' height='16px' width='16px' />
        </Paper>
        <Stack gap='2px' justify='space-around' w='100%'>
          <Title order={3} size='h4'>
            Spotify Premium 1st 2024
          </Title>
          <Box w={{ base: '92%', xs: '100%' }}>
            <Text size='xs' c='dimmed' truncate='end'>
              030f1d67-6d34-47dc-82bc-66207aa0bd9c
            </Text>
          </Box>
        </Stack>
      </Group>
      <Flex
        gap='0px'
        align={{ base: 'center', xs: 'end' }}
        justify={{ base: 'space-between', xs: 'space-around' }}
        direction={{ base: 'row', xs: 'column' }}
      >
        <Text>01.01.2024 00:00</Text>
        <Text c={summa < 0 ? 'red' : 'green'} fw={500} size='lg'>
          <NumberFormatter
            value={summa}
            prefix={summa > 0 ? '+' : ''}
            suffix=' ₴'
            thousandSeparator=' '
            decimalScale={2}
            fixedDecimalScale
          />
        </Text>
      </Flex>
    </Flex>
  );
}
