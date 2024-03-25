import { Card, CardSection, Divider, Input, Text, Title } from '@mantine/core';
import React from 'react';

interface IProps {
  title: string;
  description: string;
  value?: string | number | null;
  bottomDescription?: string;
}

export default function UserReadOnlyCard({ title, description, value, bottomDescription }: IProps) {
  return (
    <Card w='100%'>
      <Title order={3}>{title}</Title>
      <Text c='dimmed'>{description}</Text>
      <Input value={value ?? ''} py='sm' readOnly />
      <CardSection my='xs'>
        <Divider />
      </CardSection>
      <Text c='dimmed' size='sm'>
        {bottomDescription}
      </Text>
    </Card>
  );
}
