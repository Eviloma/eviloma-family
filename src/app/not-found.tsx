import { GetServerSideProps } from 'next/types';
import React from 'react';

import BaseErrorPage from '@/components/errorPages/BaseErrorPage';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 404;
  return { props: {} };
};

export default function NotFoundPage() {
  return <BaseErrorPage />;
}
