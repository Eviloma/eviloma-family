import { Card, CardSection, Divider, Flex, Input, Text, Title } from "@mantine/core";
import type React from "react";
import type { HTMLInputTypeAttribute } from "react";

interface IProps {
  title: string;
  description: string;
  value?: string | number | null;
  bottomDescription?: string;
  children?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  rightSection?: React.ReactNode;
  error?: boolean;
}

export default function UserReadOnlyCard({
  title,
  description,
  value,
  bottomDescription,
  children,
  type,
  rightSection,
  error,
}: IProps) {
  return (
    <Card w="100%">
      <Title order={3}>{title}</Title>
      <Text c="dimmed">{description}</Text>
      <Input value={value ?? ""} type={type} py="sm" rightSection={rightSection} error={error} readOnly />
      <CardSection my="xs">
        <Divider />
      </CardSection>
      <Flex align="center" gap="sm" justify="space-between">
        <Text c="dimmed" size="sm">
          {bottomDescription}
        </Text>
        {children}
      </Flex>
    </Card>
  );
}
