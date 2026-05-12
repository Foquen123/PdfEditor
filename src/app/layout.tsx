import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Wrapper from '@/components/layout/main-wrapper';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  title: 'Редактор PDF',
  description: 'Приложение для работы с pdf файлами',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${roboto.variable} h-full antialiased`}>
      <Wrapper>{children}</Wrapper>
    </html>
  );
}
