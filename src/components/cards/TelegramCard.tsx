'use client';

import { ActionIcon, Avatar, Card, GridCol, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import React from 'react';

import TelegramIcon from '@/icons/Telegram';
import { ExtendedUser } from '@/types/user';
import QueryRequest from '@/utils/query-request';

import CardTitle from './items/CardTitle';
import TelegramLinkButton from './items/TelegramLinkButton';
import TelegramUnLinkButton from './items/TelegramUnlinkButton';

export default function TelegramCard() {
  const queryClient = useQueryClient();
  const { data, isLoading, isRefetching } = useQuery<ExtendedUser>({
    queryKey: ['user'],
    queryFn: () =>
      QueryRequest({
        link: '/api/user',
      }),
  });

  if (isLoading || !data) {
    return (
      <GridCol
        span={{
          base: 12,
          md: 6,
          lg: 4,
        }}
      >
        <Skeleton radius='md' h='100%' />
      </GridCol>
    );
  }
  return (
    <GridCol
      span={{
        base: 12,
        md: 6,
        lg: 4,
      }}
    >
      <Card shadow='sm' padding='lg' radius='md' h='100%' withBorder>
        <Card.Section withBorder inheritPadding py='xs'>
          <CardTitle icon={<TelegramIcon fill='white' width='24px' height='24px' />} title='Телеграм'>
            <Tooltip label='Оновити' withArrow events={{ hover: true, focus: true, touch: false }}>
              <ActionIcon
                onClick={() => queryClient.invalidateQueries({ queryKey: ['user'] })}
                variant='light'
                size='lg'
                disabled={isRefetching}
              >
                <RefreshCcw className={isRefetching ? 'animate-spin' : ''} />
              </ActionIcon>
            </Tooltip>
          </CardTitle>
        </Card.Section>

        <Stack gap='md' mt='md' justify='space-between' h='100%'>
          {data.telegramID ? (
            <Stack gap='sm' align='center' my='auto'>
              <Group gap='sm' align='center'>
                <Avatar src={data.telegramAvatar} alt='Avatar' size='xl' color='violet' />
                <Stack gap='4px' py='xs'>
                  <Text fw={600} size='lg'>
                    {data.telegramUsername ?? '-'}
                  </Text>
                  <Text c='dimmed'>{data.telegramID}</Text>
                </Stack>
              </Group>
              <Text size='xs' c='dimmed'>
                Дані про телеграм акаунт оновлюються лише при підключені Telegram
              </Text>
            </Stack>
          ) : (
            <Stack ta='center' className='flex-1 text-balance' gap='xs'>
              <Text>Ви не прив&#39;язали телеграм бота</Text>
              <Text c='dimmed' size='sm'>
                Підключіть наш Telegram бот для зручного доступу! Отримуйте сповіщення про оплату, інформацію про
                баланс, активні підписки, транзакції. Зручна інтеграція, швидкий доступ та персоналізований сервіс
              </Text>
              <Text c='dimmed' size='sm'>
                Для прив&apos;язки телеграм, натисніть на кнопку нижче. Для вас буде згенеровано унікальний токен, який
                буде дійсний на протязі 15 хвилин. Після того як ви натисните кнопку, ви будете перенаправлені в
                телеграм бота.
              </Text>
            </Stack>
          )}

          <Stack gap='sm' mt='md'>
            {data.telegramID ? <TelegramUnLinkButton /> : <TelegramLinkButton />}
          </Stack>
        </Stack>
      </Card>
    </GridCol>
  );
}
