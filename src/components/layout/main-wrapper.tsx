'use client';
import { siteConfig } from '@/config/site.config';
import { useLayoutStore } from '@/store/layout.store';

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isNavbarOpen } = useLayoutStore();
  return (
    <body
      className={`${isNavbarOpen ? 'overflow-hidden' : 'overflow-y-auto'} flex flex-col bg-bg relative h-full `}
    >
      {children}
    </body>
  );
}
