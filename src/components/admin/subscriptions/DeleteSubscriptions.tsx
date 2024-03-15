'use client';

import { ActionIcon, Box, Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

import Subscription from '@/types/subscription';
import QueryRequest from '@/utils/query-request';

interface IProps {
  subscription: Subscription;
}

export default function DeleteSubscriptions({ subscription }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => QueryRequest({ link: `/api/subscriptions/${subscription.id}`, method: 'DELETE' }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      close();
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      notifications.show({
        title: 'Успішно',
        message: 'Успішно видалено підписку',
      });
    },
    onError(error) {
      notifications.show({
        title: 'Помилка під час видалення підписки',
        message: error.message,
        color: 'red',
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} centered title='Видалення підписки'>
        <Box>
          <Text span>Ви дійсно хочете видалити підписку </Text>
          <Text span fw={500} c='violet'>
            {subscription.title}
          </Text>
          <Text span>? Це видалить підписку у всіх користувачів. Цю дію неможливо скасувати.</Text>
        </Box>
        <Group gap='sm' mt='md' grow>
          <Button onClick={close} loading={isLoading}>
            Скасувати
          </Button>
          <Button color='red' loading={isLoading} onClick={() => mutate()}>
            Видалити
          </Button>
        </Group>
      </Modal>
      <ActionIcon color='red' size='lg' onClick={open}>
        <Trash />
      </ActionIcon>
    </>
  );
}
