import { Group, Title } from '@mantine/core';
import React from 'react';

import { getLogtoContext } from '@/utils/logto';

import SignInButton from '../SignInButton';
import NavBarMenu from './NavBarMenu';

export default async function NavBar() {
  const { isAuthenticated, userInfo } = await getLogtoContext({ fetchUserInfo: true });
  return (
    <Group align='center' justify='space-between' wrap='nowrap' w='100%' mih='70px'>
      <Title textWrap='nowrap' size='h3' order={1}>
        Logo
      </Title>
      <Group gap='4px' align='center' wrap='nowrap'>
        {isAuthenticated && userInfo && (
          <NavBarMenu name={userInfo.name} email={userInfo.email!} avatar={userInfo.picture} />
        )}
        {!isAuthenticated && <SignInButton />}
      </Group>
    </Group>
  );
}
