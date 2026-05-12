'use client';

import ActionButton from '@/components/common/action-button';
import PageDescription from '@/components/common/page-description';
import PageTitle from '@/components/common/page-title';
import ToolSidebar from '@/components/common/tool-sidebar';
import EditPdfWrapper from '@/components/layout/edit-pdf-wrapper';
import WelcomeScreen from '@/components/layout/welcome-screen';
import PdfCardMerge from '@/components/merge-pdf-page/PdfCardMerge/PdfCardMerge';
import { useFile } from '@/hooks/useFile';
import { useState } from 'react';
import toast from 'react-hot-toast';

function CompressMode({
  desc,
  title,
  isSelect,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
  isSelect: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col p-2.5 border-b border-border cursor-pointer"
      style={{ background: isSelect ? '#EBEBF4' : undefined }}
    >
      <p className="uppercase text-accent text-[16px]">{title}</p>
      <p className="text-[14px]">{desc}</p>
    </div>
  );
}

type CompressType = 'low' | 'medium' | 'high';

interface ICompressMode {
  type: CompressType;
  title: string;
  desc: string;
}

const COMPRESS_MODES: ICompressMode[] = [
  {
    type: 'high',
    desc: 'Менее качество, высокая степень сжатия',
    title: 'Экстремальные сжатия',
  },
  {
    type: 'medium',
    desc: 'Хорошее качество, хорошее сжатие',
    title: 'Рекомендуемая сжатия',
  },
  {
    type: 'low',
    desc: 'Высокое качество, меньшее сжатие',
    title: 'Низкое сжатие',
  },
];

export default function CompressPdfPage() {
  const {
    handleFileUpload,
    files,
    isLoading,
    downloadSplitPdf,
    removeFile,
    compressAndDownload,
    handeFilesDragDropUpload,
  } = useFile({
    manyUpload: false,
  });
  const [compressMode, setCompressMode] = useState<CompressType>('medium');

  if (files.length === 0)
    return (
      <WelcomeScreen
        handleFileDragDropUpload={handeFilesDragDropUpload}
        isLoading={isLoading}
      >
        <PageTitle>Сжать PDF</PageTitle>
        <PageDescription>
          Уменьшайте размер вашего PDF файла, и при этом сохраняйте качество.
          Оптимизируйте ваши PDF файлы.
        </PageDescription>
        <ActionButton
          handleClick={() => {}}
          handleFileUpload={handleFileUpload}
        >
          Выбрать PDF файл
        </ActionButton>
        <p className="text-[14px]">или перетащите файл PDF сюда</p>
      </WelcomeScreen>
    );
  const download = () =>
    toast.promise(compressAndDownload(), {
      loading: 'Скачивание...',
      success: 'Скачивание завершено',
      error: 'Ошибка',
    });
  return (
    <>
      <EditPdfWrapper
        workspace={
          <>
            <PdfCardMerge
              file={files[0].file}
              id={files[0].id}
              index={0}
              onDelete={() => {
                removeFile(files[0].id);
              }}
            ></PdfCardMerge>
          </>
        }
        toolSidebar={
          <ToolSidebar
            buttonText="Сжать PDF"
            isButtonDisabled={false}
            title="степень сжатия"
            onCreateDocument={() => download()}
          >
            <>
              {COMPRESS_MODES.map((m) => (
                <CompressMode
                  key={m.type}
                  isSelect={m.type === compressMode}
                  onClick={() => setCompressMode(m.type)}
                  desc={m.desc}
                  title={m.title}
                ></CompressMode>
              ))}
            </>
          </ToolSidebar>
        }
        isLoading={isLoading}
      ></EditPdfWrapper>
    </>
  );
}
