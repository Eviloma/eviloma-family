import { Grid, TabsPanel } from '@mantine/core';
import React from 'react';

import User from '@/types/user';

import UserCard from './UserCard';
import UserReadOnlyCard from './UserReadOnlyCard';

interface IProps {
  user: User;
}

export default function UserProfileTab({ user }: IProps) {
  return (
    <TabsPanel value='profile'>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <UserReadOnlyCard
            title='ID'
            description='ID користувача в системі Eviloma'
            value={user.id}
            bottomDescription='ID встановлюється автоматично'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <UserReadOnlyCard
            title='Email'
            description='Email користувача в системі Eviloma'
            value={user.email}
            bottomDescription='Email заборонено змінювати'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
          <UserReadOnlyCard
            title='Username'
            description='Username користувача в системі Eviloma'
            value={user.username}
            bottomDescription='Для зміни Username перейдіть на Eviloma ID'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
          <UserReadOnlyCard
            title='Баланс'
            description='Баланс користувача'
            value={`${user.balance / 100} ₴`}
            bottomDescription='Баланс дозволено змінювати лише за допомогою транзакцій'
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
          <UserCard
            title='Оплата'
            description='Посилання для оплати'
            value={user.paymentLink}
            userId={user.id}
            route={`/api/users/${user.id}/payment-link`}
          />
        </Grid.Col>
      </Grid>
    </TabsPanel>
  );
}
