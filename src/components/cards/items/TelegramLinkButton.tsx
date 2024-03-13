'use client';

import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'lucide-react';
import React, { useState } from 'react';

import TelegramPOST from '@/types/telegram-post';
import QueryRequest from '@/utils/query-request';

export default function TelegramLinkButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation<TelegramPOST>({
    mutationFn: () => QueryRequest({ link: '/api/telegram', method: 'POST' }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess({ token }) {
      window.open(`${process.env.NEXT_PUBLIC_TELEGRAM_BOT_LINK}?start=${token}`, '_blank');
    },
    onError(error) {
      notifications.show({
        title: "Помилка під час зв'язку з Телеграм",
        message: error.message,
        color: 'red',
      });
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  return (
    <Button fullWidth leftSection={<Link />} variant='light' loading={isLoading} onClick={() => mutate()}>
      Прив&#39;язати телеграм бота
    </Button>
  );
}
