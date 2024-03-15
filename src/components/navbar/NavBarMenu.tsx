import { Menu, MenuDivider, MenuDropdown, MenuItem, MenuLabel, MenuTarget } from '@mantine/core';
import { CalendarClock, LayoutDashboard, ReceiptText, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import isAdmin from '@/utils/is-admin';

import SignOutMenuItem from './SignOutMenuItem';
import UserButton from './UserButton';

const iconProps = {
  size: 18,
};

interface IProps {
  username?: string | null;
  email: string;
  avatar?: string | null;
  scopes?: string[];
}

export default function NavBarMenu({ username, email, avatar, scopes }: IProps) {
  return (
    <Menu shadow='md' width={250} withArrow>
      <MenuTarget>
        <UserButton image={avatar ?? ''} name={username ?? email} email={email} />
      </MenuTarget>

      <MenuDropdown>
        <MenuLabel>Вітаємо, {username ?? email}</MenuLabel>
        <MenuItem component={Link} href='/dashboard' leftSection={<LayoutDashboard {...iconProps} />}>
          Інформаційна дошка
        </MenuItem>
        <MenuItem component={Link} href='/transactions' leftSection={<ReceiptText {...iconProps} />}>
          Транзакції
        </MenuItem>
        <MenuDivider />
        {isAdmin(scopes) && (
          <>
            <MenuLabel>Адміністрування</MenuLabel>
            <MenuItem component={Link} href='/admin/subscriptions' leftSection={<CalendarClock {...iconProps} />}>
              Керування підписками
            </MenuItem>
            <MenuItem component={Link} href='/admin/users' leftSection={<UserRoundCog {...iconProps} />}>
              Керування користувачами
            </MenuItem>
            <MenuDivider />
          </>
        )}
        <SignOutMenuItem iconProps={iconProps} />
      </MenuDropdown>
    </Menu>
  );
}
