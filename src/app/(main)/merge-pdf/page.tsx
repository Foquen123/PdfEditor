'use client';

import ActionButton from '@/components/common/action-button';
import InfoText from '@/components/common/info-text';
import PageDescription from '@/components/common/page-description';
import PageTitle from '@/components/common/page-title';
import ToolSidebar from '@/components/common/tool-sidebar';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { useFile } from '@/hooks/useFile';
import { PdfFile } from '@/interfaces/pdfFile.interface';
import EditPdfWrapper from '@/components/layout/edit-pdf-wrapper';
import PdfCardMerge from '@/components/merge-pdf-page/PdfCardMerge/PdfCardMerge';
import WelcomeScreen from '@/components/layout/welcome-screen';
import toast from 'react-hot-toast';
function Workspace({
  files,
  moveFile,
  removeFile,
}: {
  files: PdfFile[];
  removeFile: (id: string) => void;
  moveFile: (a: number, b: number) => void;
}) {
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const { source } = event.operation;
        if (isSortable(source)) {
          const { initialIndex, index } = source;
          moveFile(initialIndex, index);
        }
      }}
    >
      {files.map((f, index) => (
        <PdfCardMerge
          key={f.id}
          onDelete={() => removeFile(f.id)}
          file={f.file}
          id={f.id}
          index={index}
        ></PdfCardMerge>
      ))}
    </DragDropProvider>
  );
}

export default function MergePdfPage() {
  const {
    files,
    handleFileUpload,
    isLoading,
    removeFile,
    moveFile,
    downloadMergePdf,
    handeFilesDragDropUpload,
  } = useFile({});

  if (files.length === 0)
    return (
      <WelcomeScreen
        handleFileDragDropUpload={handeFilesDragDropUpload}
        isLoading={isLoading}
      >
        <PageTitle>Объединить PDF файлы</PageTitle>
        <PageDescription>
          Объединяйте PDF файлы и упорядочите их легко и быстро в любом порядке,
          который вам нравится.
        </PageDescription>
        <ActionButton
          handleClick={() => {}}
          handleFileUpload={handleFileUpload}
        >
          Выбрать PDF файлы
        </ActionButton>
        <p className="text-[14px]">или перетащите файлы PDF сюда</p>
      </WelcomeScreen>
    );

  const download = () =>
    toast.promise(downloadMergePdf('merged.pdf'), {
      loading: 'Скачивание...',
      success: 'Скачивание завершено',
      error: 'Ошибка',
    });
  return (
    <>
      <EditPdfWrapper
        isLoading={isLoading}
        toolSidebar={
          <ToolSidebar
            isButtonDisabled={files.length < 2 || isLoading}
            buttonText="Объединить PDF"
            title="Объединить PDF"
            onAddDocument={handleFileUpload}
            onCreateDocument={async () => {
              // await downloadMergePdf('merge.pdf');
              download();
            }}
          >
            <div className="flex flex-col px-2.5 gap-2.5 pt-3.75">
              {files.length < 2 && (
                <InfoText>
                  {`Пожалуйста, выберите несколько PDF-файлов, нажав еще раз на "Выбрать
                PDF файлы". Выберите несколько файлов, удерживая клавишу "Ctrl"`}
                </InfoText>
              )}
              {files.length >= 2 && (
                <InfoText>
                  {
                    'Чтобы изменить порядок ваших PDF-файлов, перетащите файлы по своему усмотрению.'
                  }
                </InfoText>
              )}
            </div>
          </ToolSidebar>
        }
        workspace={
          <Workspace
            files={files}
            moveFile={moveFile}
            removeFile={removeFile}
          ></Workspace>
        }
      ></EditPdfWrapper>
    </>
  );
}
