'use client';

import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Unlink } from 'lucide-react';
import React, { useState } from 'react';

import QueryRequest from '@/utils/query-request';

export default function TelegramUnLinkButton() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: () => QueryRequest({ link: '/api/telegram', method: 'DELETE' }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      notifications.show({
        title: 'Успішно',
        message: "Успішно видалено зв'язок з Телеграм",
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError(error) {
      notifications.show({
        title: "Помилка під час видалення зв'язку з Телеграм",
        message: error.message,
        color: 'red',
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  return (
    <Button fullWidth leftSection={<Unlink />} variant='light' loading={isLoading} color='red' onClick={() => mutate()}>
      Відв&#39;язати телеграм бота
    </Button>
  );
}
