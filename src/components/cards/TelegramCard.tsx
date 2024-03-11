'use client';

import { Avatar, Button, Card, GridCol, Group, Stack, Text } from '@mantine/core';
import { Link, Unlink } from 'lucide-react';
import React from 'react';

import TelegramIcon from '@/app/icons/Telegram';

import CardTitle from './items/CardTitle';

export default function TelegramCard() {
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
          <CardTitle icon={<TelegramIcon fill='white' width='24px' height='24px' />} title='Телеграм' />
        </Card.Section>

        <Stack gap='md' mt='md' justify='space-between' h='100%'>
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

          <Stack gap='sm' mt='md'>
            <Button fullWidth leftSection={<Link />} variant='light'>
              Прив&#39;язати телеграм бота
            </Button>
            <Button fullWidth leftSection={<Unlink />} variant='light' color='red'>
              Відв&#39;язати телеграм бота
            </Button>
          </Stack>
        </Stack>
      </Card>
    </GridCol>
  );
}
