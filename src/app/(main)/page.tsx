import PageDescription from '@/components/common/page-description';
import PageTitle from '@/components/common/page-title';
import ToolCard from '@/components/common/tool-card';
import { siteConfig } from '@/config/site.config';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center p-15 overflow-auto h-full">
      <div className="max-w-230 flex flex-col gap-7.5 ">
        <PageTitle>Инструменты для работы с PDF</PageTitle>
        <PageDescription>
          Полностью бесплатные онлайн-инструменты для объединения, разделения,
          сжатия PDF-файлов. Без необходимости установки.
        </PageDescription>
      </div>
      <div className="flex flex-wrap gap-2.5 mt-17.5 justify-center">
        {siteConfig.toolCards.map((t) => (
          <ToolCard
            key={t.href}
            href={t.href}
            title={t.title}
            desc={t.desc}
          ></ToolCard>
        ))}
      </div>
    </div>
  );
}
