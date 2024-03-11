'use client';

import { Avatar, Button, Card, CopyButton, GridCol, Group, Stack, Text } from '@mantine/core';
import { Clipboard, ClipboardCheck, UserRound } from 'lucide-react';
import React from 'react';

import CardTitle from './items/CardTitle';

export default function ProfileCard() {
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
          <CardTitle icon={<UserRound />} title='Профіль' />
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
                <Text c='dimmed'>you@example.com</Text>
              </Stack>
            </Group>
          </Stack>

          <Stack gap='sm' mt='md'>
            <CopyButton value='123456789'>
              {({ copied, copy }) => (
                <Button
                  color={copied ? 'teal' : ''}
                  leftSection={copied ? <ClipboardCheck /> : <Clipboard />}
                  variant='light'
                  onClick={copy}
                >
                  {copied ? 'ID скопійовано' : 'Скопіювати ID'}
                </Button>
              )}
            </CopyButton>
          </Stack>
        </Stack>
      </Card>
    </GridCol>
  );
}
