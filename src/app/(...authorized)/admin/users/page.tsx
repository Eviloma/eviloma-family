import { Title } from '@mantine/core';
import React from 'react';

import UsersList from '@/components/admin/users/UsersList';

export default function Page() {
  return (
    <>
      <Title order={2} ta='center' mb='md'>
        Користувачі
      </Title>
      <UsersList />
    </>
  );
}
