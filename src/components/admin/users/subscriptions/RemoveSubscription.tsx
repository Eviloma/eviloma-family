"use client";

import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React, { useState } from "react";

import type Subscription from "@/types/subscription";
import type User from "@/types/user";
import QueryRequest from "@/utils/query-request";

interface IProps {
  user: User;
  subscription: Subscription;
}

export default function RemoveSusbcription({ user, subscription }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      QueryRequest({ link: `/api/users/${user.id}/subscriptions/${subscription.id}`, method: "DELETE" }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      close();
      queryClient.invalidateQueries({ queryKey: [`user-${user.id}-subscriptions`] });
      notifications.show({
        title: "Успішно",
        message: "Успішно видалено підписку у користувача",
      });
    },
    onError(error) {
      notifications.show({
        title: "Помилка під час видалення підписки у користувача",
        message: error.message,
        color: "red",
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} centered title="Видалення підписки">
        <Box>
          <Text span>Ви дійсно хочете видалити підписку </Text>
          <Text span fw={500} c="violet">
            {subscription.title}
          </Text>
          <Text span> у </Text>
          <Text span fw={500} c="violet">
            {user.username ?? user.email}
          </Text>
          <Text span>?</Text>
        </Box>
        <Group gap="sm" mt="md" grow>
          <Button onClick={close} loading={isLoading}>
            Скасувати
          </Button>
          <Button color="red" loading={isLoading} onClick={() => mutate()}>
            Видалити
          </Button>
        </Group>
      </Modal>
      <Button leftSection={<Trash size={16} />} color="red" fullWidth onClick={open}>
        Видалити
      </Button>
    </>
  );
}
