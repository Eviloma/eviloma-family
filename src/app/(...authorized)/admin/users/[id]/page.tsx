import { ActionIcon, Flex, Title } from '@mantine/core';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import UserSettings from '@/components/admin/users/UserSettings';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Flex direction='row'>
        <ActionIcon component={Link} href='/admin/users' variant='subtle' size='lg'>
          <ChevronLeft />
        </ActionIcon>
        <Title order={2} ta='center' mb='md' className='flex-1'>
          Управління користувачем
        </Title>
      </Flex>
      <UserSettings id={params.id} />
    </>
  );
}
