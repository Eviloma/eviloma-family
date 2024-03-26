import { Card, CardSection, Center, Group, Image, ScrollArea } from '@mantine/core';
import NextImage from 'next/image';
import React from 'react';

export default function Mockup() {
  return (
    <Center mt='xl'>
      <Card withBorder bg='dark.7'>
        <CardSection>
          <ScrollArea>
            <Image
              component={NextImage}
              visibleFrom='md'
              alt='Mockup'
              radius='md'
              src='/mockups/desktop.png'
              mah='540px'
              height={1080}
              width={1920}
              quality={100}
              priority
            />
            <Group align='center' gap='xl' hiddenFrom='md' wrap='nowrap'>
              <Image
                component={NextImage}
                alt='Mockup Mobile'
                radius='md'
                src='/mockups/mobile1.png'
                mah='540px'
                height={1920}
                width={1080}
                quality={100}
                priority
              />
              <Image
                component={NextImage}
                hiddenFrom='md'
                alt='Mockup Mobile'
                radius='md'
                src='/mockups/mobile2.png'
                mah='540px'
                height={1920}
                width={1080}
                quality={100}
                priority
              />
            </Group>
          </ScrollArea>
        </CardSection>
      </Card>
    </Center>
  );
}
