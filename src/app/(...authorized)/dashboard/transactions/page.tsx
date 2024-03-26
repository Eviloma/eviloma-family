import React from 'react';

import UserTransactions from '@/components/UserTransactions';

export default function Page() {
  return (
    <div className='space-y-8'>
      <h2>Транзакції</h2>
      <UserTransactions />
    </div>
  );
}
