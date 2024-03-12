import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import React, { forwardRef } from 'react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-xs)',
        borderRadius: 'var(--mantine-radius-md)',
      }}
      className='duration-300 hover:bg-[var(--mantine-color-dark-6)]'
      {...others}
    >
      <Group gap='xs'>
        <Avatar src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500} maw='125px' truncate>
            {name}
          </Text>

          <Text c='dimmed' size='xs' maw='125px' truncate>
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
);

export default UserButton;
