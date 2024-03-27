import { Group, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

import { getLogtoContext } from '@/utils/logto';

import SignInButton from '../SignInButton';
import NavBarMenu from './NavBarMenu';

export default async function NavBar() {
  const { isAuthenticated, userInfo, scopes } = await getLogtoContext({ fetchUserInfo: true, getAccessToken: true });
  return (
    <Group align='center' justify='space-between' wrap='nowrap' w='100%' mih='70px'>
      <Title textWrap='nowrap' size='h3' order={1} aria-label='Eviloma Family'>
        <Image src='/logo.png' width={52} height={52} alt='Eviloma Family' />
      </Title>
      <Group gap='4px' align='center' wrap='nowrap'>
        {isAuthenticated && userInfo && (
          <NavBarMenu username={userInfo.username} email={userInfo.email!} avatar={userInfo.picture} scopes={scopes} />
        )}
        {!isAuthenticated && <SignInButton />}
      </Group>
    </Group>
  );
}
