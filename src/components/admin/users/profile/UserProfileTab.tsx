import { Stack, TabsPanel } from '@mantine/core';
import React from 'react';

import User from '@/types/user';

import UserReadOnlyCard from './UserReadOnlyCard';

interface IProps {
  user: User;
}

export default function UserProfileTab({ user }: IProps) {
  return (
    <TabsPanel value='profile'>
      <Stack gap='md' w='100%' maw='576px'>
        <UserReadOnlyCard
          title='ID'
          description='ID користувача в системі Eviloma'
          value={user.id}
          bottomDescription='ID встановлюється автоматично'
        />
        <UserReadOnlyCard
          title='Email'
          description='Email користувача в системі Eviloma'
          value={user.email}
          bottomDescription='Email заборонено змінювати'
        />
        <UserReadOnlyCard
          title='Username'
          description='Username користувача в системі Eviloma'
          value={user.username}
          bottomDescription='Для зміни Username перейдіть на Eviloma ID'
        />
      </Stack>
    </TabsPanel>
  );
}
