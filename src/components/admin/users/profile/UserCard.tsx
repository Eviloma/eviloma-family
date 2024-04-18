"use client";

import { Button, Card, CardSection, Divider, Flex, Input, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import QueryRequest from "@/utils/query-request";

interface IProps {
  title: string;
  description: string;
  value?: string | number | null;
  bottomDescription?: string;

  route: string;
  userId: string;
}

export default function UserCard({ title, description, value, bottomDescription, route, userId }: IProps) {
  const [data, setData] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => QueryRequest({ link: route, method: "POST", body: { data } }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [`user-${userId}`] });
      notifications.show({
        title: "Успішно",
        message: "Успішно змінено посилання для оплати",
      });
    },
    onError(error) {
      notifications.show({
        title: "Помилка під час зміни посилання",
        message: error.message,
        color: "red",
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  return (
    <Card w="100%">
      <Title order={3}>{title}</Title>
      <Text c="dimmed">{description}</Text>
      <Input value={data?.toString()} onChange={(e) => setData(e.target.value)} py="sm" />
      <CardSection my="xs">
        <Divider />
      </CardSection>
      <Flex align="center" gap="sm" justify="space-between">
        <Text c="dimmed" size="sm">
          {bottomDescription}
        </Text>
        <Button onClick={() => mutate()} loading={isLoading}>
          Зберегти
        </Button>
      </Flex>
    </Card>
  );
}
