'use client';

import 'dayjs/locale/uk';

import { Box, Group, NumberFormatter, Stack, Text, Title } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { forEach } from 'lodash';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import React, { useMemo } from 'react';

import Transaction from '@/types/transaction';
import User from '@/types/user';
import QueryRequest from '@/utils/query-request';

import { getCategoryData } from '../../CategoryItem';
import AddTransactionButton from './AddTransactionButton';

interface IProps {
  user: User;
}

const colums: DataTableColumn<Transaction>[] = [
  {
    accessor: 'title',
    title: '',
    render: ({ title, date, category }) => (
      <Group align='center' wrap='nowrap'>
        <Box bg='dark.5' p='xs' className='flex items-center justify-center rounded-full'>
          {getCategoryData(category).icon}
        </Box>
        <Stack gap='1px'>
          <Title order={3} size='h5' textWrap='nowrap'>
            {title}
          </Title>
          <Text c='dimmed' size='xs'>
            {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}
          </Text>
        </Stack>
      </Group>
    ),
  },
  {
    accessor: 'value',
    title: '',
    textAlign: 'right',
    render: ({ suma }) => (
      <Text c={suma > 0 ? 'green.3' : 'red.3'} className='text-nowrap sm:text-lg md:text-xl'>
        <NumberFormatter
          prefix={suma > 0 ? '+' : ''}
          value={suma / 100}
          suffix=' ₴'
          thousandSeparator=' '
          decimalScale={2}
          fixedDecimalScale
        />
      </Text>
    ),
  },
];

export default function UserTransactionTab({ user }: IProps) {
  const { data, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery<{
    data: Transaction[];
    meta: { page: number; total: number };
  }>({
    queryKey: [`user-${user.id}-transactions`],
    queryFn: ({ pageParam }) =>
      QueryRequest({
        link: `/api/users/${user.id}/transactions?page=${pageParam}`,
        method: 'GET',
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.page + 1,
  });

  const allData = useMemo(() => {
    if (!data || !data.pages || !data.pages[0]) {
      return [];
    }

    let result: Transaction[] = [];

    forEach(data.pages, (page) => {
      result = [...result, ...(page?.data ?? [])];
    });

    return result;
  }, [data]);

  return (
    <Stack gap='sm' w='100%'>
      <Group justify='end'>
        <AddTransactionButton id={user.id} />
      </Group>
      <DataTable
        noHeader
        columns={colums}
        records={allData}
        minHeight={150}
        fetching={isFetching || isFetchingNextPage}
        onScrollToBottom={fetchNextPage}
        noRecordsText='Транзакції відсутні'
      />
    </Stack>
  );
}
