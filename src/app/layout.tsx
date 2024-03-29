import './globals.css';

import { type Metadata } from 'next';
import { Raleway } from 'next/font/google';
import React from 'react';

const raleway = Raleway({ subsets: ['cyrillic-ext'] });

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
