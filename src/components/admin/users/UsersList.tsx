'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import User from '@/types/user';
import QueryRequest from '@/utils/query-request';

export default function UsersList() {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
      QueryRequest({
        link: '/api/users',
        method: 'GET',
      }),
  });
  return (
    <DataTable
      fetching={isLoading}
      striped
      mih='150px'
      columns={[
        { accessor: 'username', title: 'Ім`я користувача', render: (value) => value.username },
        { accessor: 'actions', width: '100px' },
      ]}
      records={data ?? []}
    />
  );
}
