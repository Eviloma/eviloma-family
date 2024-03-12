import { createTheme } from '@mantine/core';
import { Nunito_Sans } from 'next/font/google';

const nunito = Nunito_Sans({ subsets: ['cyrillic-ext', 'latin-ext'] });

const theme = createTheme({
  headings: {
    fontFamily: nunito.style.fontFamily,
  },
  primaryColor: 'violet',
  autoContrast: true,
  cursorType: 'pointer',
  defaultRadius: 'md',
});

export default theme;
