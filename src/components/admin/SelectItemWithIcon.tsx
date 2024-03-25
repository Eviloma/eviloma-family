import { Group, Text } from '@mantine/core';
import React, { ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  label: string;
}

export default function SelectItemWithIcon({ icon, label }: IProps) {
  return (
    <Group gap='md'>
      {icon}
      <Text>{label}</Text>
    </Group>
  );
}
