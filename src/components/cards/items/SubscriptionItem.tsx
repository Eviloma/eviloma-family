import { Box, Flex, Group, NumberFormatter, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';

import YoutubeIcon from '@/app/icons/Youtube';

export default function SubscriptionItem() {
  return (
    <Flex gap='xs' direction={{ base: 'column', xs: 'row' }} justify={{ xs: 'space-between' }} align={{ xs: 'center' }}>
      <Group gap='sm' align='center' wrap='nowrap' className='overflow-x-hidden'>
        <Paper p='xs' radius='xl'>
          <YoutubeIcon fill='#ff0000' height='16px' width='16px' />
        </Paper>
        <Stack gap='2px' justify='space-around' w='100%'>
          <Title order={3} size='h4'>
            Spotify Premium 1st 2024
          </Title>
          <Box w='92%'>
            <Text size='xs' c='dimmed' truncate='end'>
              Наступна оплата: 01.01.2024
            </Text>
          </Box>
        </Stack>
      </Group>
      <Text fw={500} size='lg' ta='end'>
        <NumberFormatter value={30} suffix=' ₴/міс' thousandSeparator=' ' decimalScale={2} fixedDecimalScale />
      </Text>
    </Flex>
  );
}
