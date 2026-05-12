import Header from '@/components/layout/header';
import { siteConfig } from '@/config/site.config';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <main
        style={{ paddingTop: siteConfig.topbarHeight }}
        className="h-screen overflow-hidden"
      >
        {children}
      </main>
    </>
  );
}
