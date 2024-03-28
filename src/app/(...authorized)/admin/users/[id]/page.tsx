import { ActionIcon, Flex, Title } from '@mantine/core';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next/types';
import React from 'react';

import UserSettings from '@/components/admin/users/UserSettings';

const PAGE_TITLE = 'Управління користувачем';
export const metadata: Metadata = {
  title: PAGE_TITLE,
  openGraph: {
    title: PAGE_TITLE,
  },
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Flex direction='row'>
        <ActionIcon component={Link} href='/admin/users' variant='subtle' size='lg'>
          <ChevronLeft />
        </ActionIcon>
        <Title ta='center' mb='md' className='flex-1'>
          Управління користувачем
        </Title>
      </Flex>
      <UserSettings id={params.id} />
    </>
  );
}
