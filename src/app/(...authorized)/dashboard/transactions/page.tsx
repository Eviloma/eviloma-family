import { Metadata } from 'next/types';
import React from 'react';

import UserTransactions from '@/components/UserTransactions';

const PAGE_TITLE = 'Транзакції';
export const metadata: Metadata = {
  title: PAGE_TITLE,
  openGraph: {
    title: PAGE_TITLE,
  },
};

export default function Page() {
  return (
    <div className='space-y-8'>
      <h2>Транзакції</h2>
      <UserTransactions />
    </div>
  );
}
