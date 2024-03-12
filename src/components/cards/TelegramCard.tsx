'use client';

import { ActionIcon, Avatar, Button, Card, GridCol, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, RefreshCcw, Unlink } from 'lucide-react';
import React from 'react';

import TelegramIcon from '@/app/icons/Telegram';
import getUser from '@/store/get-user';
import User from '@/types/user';

import CardTitle from './items/CardTitle';

export default function TelegramCard() {
  const queryClient = useQueryClient();
  const { data, isLoading, isRefetching } = useQuery<User>({ queryKey: ['user'], queryFn: getUser });

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
                <Avatar src='avatar.png' alt='Avatar' size='xl' color='violet' />
                <Stack gap='4px' py='xs'>
                  <Text fw={600} size='lg'>
                    Username
                  </Text>
                  <Text c='dimmed'>123456789</Text>
                </Stack>
              </Group>
            </Stack>
          ) : (
            <Stack ta='center' className='flex-1 text-balance'>
              <Text>Ви не прив&#39;язали телеграм бота</Text>
              <Text c='dimmed' size='sm'>
                Підключіть наш Telegram бот для зручного доступу! Отримуйте сповіщення про оплату, інформацію про
                баланс, активні підписки, транзакції. Зручна інтеграція, швидкий доступ та персоналізований сервіс
              </Text>
            </Stack>
          )}

          <Stack gap='sm' mt='md'>
            {data.telegramID ? (
              <Button fullWidth leftSection={<Unlink />} variant='light' color='red'>
                Відв&#39;язати телеграм бота
              </Button>
            ) : (
              <Button fullWidth leftSection={<Link />} variant='light'>
                Прив&#39;язати телеграм бота
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>
    </GridCol>
  );
}
