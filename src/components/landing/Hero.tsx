import { Button, Stack, Text, Title } from '@mantine/core';
import React from 'react';

import { getLogtoContext } from '@/utils/logto';

import SignInButton from '../SignInButton';

export default async function Hero() {
  const { isAuthenticated } = await getLogtoContext();
  return (
    <Stack mt='md' align='center' gap='xl' maw='576px' mx='auto'>
      <Title order={2} size='h1'>
        Eviloma Family
      </Title>
      <Text ta='center' c='dimmed' className='text-balance'>
        Ваш персональний помічник у керуванні підписками. Забудьте про зайві витрати та заплутані рахунки - з нами ви
        контролюєте всі ваші підписки в одному місці. Просто, зручно.
      </Text>
      {isAuthenticated ? <Button>Перейти</Button> : <SignInButton label='Розпочати' />}
    </Stack>
  );
}
