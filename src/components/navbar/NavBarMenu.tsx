import { Menu, MenuDivider, MenuDropdown, MenuItem, MenuLabel, MenuTarget } from '@mantine/core';
import { CalendarClock, LayoutDashboard, ReceiptText, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import SignOutMenuItem from './SignOutMenuItem';
import UserButton from './UserButton';

const iconProps = {
  size: 18,
};

interface IProps {
  name?: string | null;
  email: string;
  avatar?: string | null;
}

export default function NavBarMenu({ name, email, avatar }: IProps) {
  return (
    <Menu shadow='md' width={250} withArrow>
      <MenuTarget>
        <UserButton image={avatar ?? ''} name={name ?? email} email={email} />
      </MenuTarget>

      <MenuDropdown>
        <MenuLabel>Вітаємо, {name ?? email}</MenuLabel>
        <MenuItem component={Link} href='/dashboard' leftSection={<LayoutDashboard {...iconProps} />}>
          Інформаційна дошка
        </MenuItem>
        <MenuItem leftSection={<ReceiptText {...iconProps} />}>Транзакції</MenuItem>
        <MenuDivider />
        <MenuLabel>Адміністрування</MenuLabel>
        <MenuItem leftSection={<CalendarClock {...iconProps} />}>Керування підписками</MenuItem>
        <MenuItem leftSection={<UserRoundCog {...iconProps} />}>Керування користувачами</MenuItem>
        <MenuDivider />
        <SignOutMenuItem iconProps={iconProps} />
      </MenuDropdown>
    </Menu>
  );
}
