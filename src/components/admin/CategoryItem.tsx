import { Group, Text } from '@mantine/core';
import { Banknote, CircleHelp } from 'lucide-react';
import React from 'react';

import SpotifyIcon from '@/icons/Spotify';
import YoutubeIcon from '@/icons/Youtube';
import { SUBSCRIPTION_CATEGORIES, TRANSACTION_CATEGORIES } from '@/utils/consts';

interface IProps {
  category: (typeof SUBSCRIPTION_CATEGORIES)[number] | (typeof TRANSACTION_CATEGORIES)[number];
}

export function getCategoryData(category: IProps['category']) {
  switch (category) {
    case 'Youtube':
      return {
        label: 'Youtube',
        icon: <YoutubeIcon width={24} height={24} fill='#ff0000' />,
      };
    case 'Spotify':
      return {
        label: 'Spotify',
        icon: <SpotifyIcon width={24} height={24} fill='#1DB954' />,
      };
    case 'Deposit':
      return {
        label: 'Deposit',
        icon: <Banknote />,
      };
    default:
      return {
        label: 'Інше',
        icon: <CircleHelp />,
      };
  }
}

export default function CategorySelectItem({ category }: IProps) {
  const data = getCategoryData(category);

  return (
    <Group gap='md'>
      {data.icon}
      <Text>{data.label}</Text>
    </Group>
  );
}
