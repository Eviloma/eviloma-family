import { Group, Title } from '@mantine/core';
import React from 'react';

interface IProps {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}

export default function CardTitle({ icon, title, children }: IProps) {
  return (
    <Group justify='space-between' align='center'>
      <Group gap='8px' align='center'>
        {icon}
        <Title order={2}>{title}</Title>
      </Group>
      <Group gap='8px' align='center'>
        {children}
      </Group>
    </Group>
  );
}
