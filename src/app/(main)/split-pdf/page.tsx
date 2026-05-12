'use client';
import ActionButton from '@/components/common/action-button';
import InfoText from '@/components/common/info-text';
import PageDescription from '@/components/common/page-description';
import PageTitle from '@/components/common/page-title';
import ToolSidebar from '@/components/common/tool-sidebar';
import EditPdfWrapper from '@/components/layout/edit-pdf-wrapper';
import WelcomeScreen from '@/components/layout/welcome-screen';
import Input from '@/components/split-pdf-page/Input';
import PdfCardSplit from '@/components/split-pdf-page/PdfCardSplit';
import Range from '@/components/split-pdf-page/Range';
import RangeMode from '@/components/split-pdf-page/RangeMode';
import Tab from '@/components/split-pdf-page/Tab';
import { useFile } from '@/hooks/useFile';
import { useHashTab } from '@/hooks/useHashTab';
import { PdfFile } from '@/interfaces/pdfFile.interface';
import { IRange } from '@/interfaces/range.interface';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import RangesScrollContainer from '@/components/split-pdf-page/RangesScrollContainer';
import toast from 'react-hot-toast';


const TABS = [
  {
    name: 'range',
    label: 'Диапазон',
  },
  {
    name: 'extract',
    label: 'Страницы',
  },
];

const RANGE_MODES = ['Настроить', 'Фиксированный'];

export default function SplitPdfPage() {
  const {
    handleFileUpload,
    files,
    isLoading,
    downloadSplitPdf,
    handeFilesDragDropUpload,
  } = useFile({
    manyUpload: false,
  });
  const { activeTab, switchTab } = useHashTab(TABS, TABS[0]);
  const [rangeMode, setRangeMode] = useState(RANGE_MODES[0]);
  const [isMergeFiles, setIsMergeFiles] = useState(false);

  const [ranges, setRanges] = useState<IRange[]>([]);
  const [fixedRangeSize, setFixedRangeSize] = useState(10);
  const initialized = useRef(false);

  useEffect(() => {
    function setChangedMode(files: PdfFile[]) {
      setRanges([
        {
          id: v4(),
          startPage: 1,
          endPage: files[0].pagesCount,
          orderNumber: 1,
        },
      ]);
    }

    function setFixedMode(files: PdfFile[], rangeSize: number) {
      const pagesCount = files[0].pagesCount;
      const rangesCount = Math.ceil(pagesCount / rangeSize);

      setRanges(() => {
        const newRanges: IRange[] = [];
        for (let i = 0; i < rangesCount; i++) {
          if (i === rangesCount - 1) {
            newRanges.push({
              id: v4(),
              startPage: i * rangeSize + 1,
              endPage: pagesCount,
              orderNumber: i + 1,
            });
          } else {
            newRanges.push({
              id: v4(),
              startPage: i * rangeSize + 1,
              endPage: (i + 1) * rangeSize,
              orderNumber: i + 1,
            });
          }
        }
        return newRanges;
      });
    }

    if (files.length > 0 && !initialized.current) {
      if (rangeMode === RANGE_MODES[0]) {
        setChangedMode(files);
      }
      if (rangeMode === RANGE_MODES[1]) {
        setFixedMode(files, fixedRangeSize);
      }
      initialized.current = true;
    }
  }, [files, rangeMode, fixedRangeSize]);

  useEffect(() => {
    initialized.current = false;
  }, [rangeMode, fixedRangeSize]);

  const download = () =>
    toast.promise(downloadSplitPdf(ranges, isMergeFiles), {
      loading: 'Скачивание...',
      success: 'Скачивание завершено',
      error: 'Ошибка',
    });

  if (files.length === 0)
    return (
      <WelcomeScreen
        handleFileDragDropUpload={handeFilesDragDropUpload}
        isLoading={isLoading}
      >
        <PageTitle>Разделить PDF файл </PageTitle>
        <PageDescription>
          Выбирайте диапазон страниц, одну страницу или преобразовывайте каждую
          страницу документа в независимый PDF-файл.
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


  return (
    <>
      
      {files.length > 0 && (
        <EditPdfWrapper
          isLoading={isLoading}
          toolSidebar={
            <ToolSidebar
              buttonText="Разделить PDF"
              title="Разделить"
              isButtonDisabled={false}
              onCreateDocument={() => download()}
            >
              <div className="flex flex-col gap-2.5 overflow-x-hidden pb-2.5">
                <div className="flex">
                  {TABS.map((t) => (
                    <Tab
                      onClick={() => switchTab(t)}
                      key={t.name}
                      isSelect={activeTab.name === t.name}
                    >
                      {t.label}
                    </Tab>
                  ))}
                </div>
                {activeTab === TABS[0] && (
                  <>
                    <div className="flex px-2.5 flex-col gap-2.5">
                      <p className="">Режим диапазона:</p>
                      <div className="flex gap-2.5  flex-wrap pb-2">
                        {RANGE_MODES.map((r) => (
                          <RangeMode
                            onClick={() => {
                              setRangeMode(r);
                            }}
                            key={r}
                            isSelect={rangeMode === r}
                          >
                            {r}
                          </RangeMode>
                        ))}
                      </div>
                    </div>
                    {rangeMode === RANGE_MODES[0] && (
                      <>
                        <DragDropProvider
                          onDragEnd={(event) => {
                            if (event.canceled) return;
                            const { source } = event.operation;
                            if (isSortable(source)) {
                              const { initialIndex, index } = source;
                              if (initialIndex !== index) {
                                setRanges((prev) => {
                                  const newItems = [...prev];
                                  const [removed] = newItems.splice(
                                    initialIndex,
                                    1,
                                  );
                                  newItems.splice(index, 0, removed);
                                  return newItems;
                                });
                              }
                            }
                          }}
                        >
                          {ranges.map((r, index) => (
                            <Range
                              index={index}
                              key={r.id}
                              pagesCount={
                                files[0].pagesCount
                                // 1
                              }
                              range={r}
                              rangeNumber={r.orderNumber}
                              handleChangeRange={(newRange) => {
                                setRanges((prev) => {
                                  const newRanges = prev.map((r) => {
                                    if (r.id === newRange.id) {
                                      return newRange;
                                    }
                                    return r;
                                  });
                                  return newRanges;
                                });
                              }}
                            ></Range>
                          ))}
                        </DragDropProvider>

                        <button
                          className="py-1.25 px-2.5 flex items-center gap-2 self-center border border-accent rounded-[10px] cursor-pointer "
                          onClick={() => {
                            setRanges((prev) => {
                              const newRange: IRange = {
                                id: v4(),
                                endPage: 1,
                                startPage: 1,
                                orderNumber: prev.length + 1,
                              };
                              return [...prev, newRange];
                            });
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5V19"
                              stroke="#E5322D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 12H19"
                              stroke="#E5322D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-[12px] text-accent">
                            Добавить Диапазон
                          </p>
                        </button>
                        <div className="flex gap-4.5 self-center">
                          <input
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            checked={isMergeFiles}
                            onChange={() => setIsMergeFiles((prev) => !prev)}
                          />
                          <label
                            className="select-none text-[12px] font-light"
                            htmlFor="checkbox"
                          >
                            Объединить все диапазоны в один PDF-файл.
                          </label>
                        </div>
                      </>
                    )}
                    {rangeMode === RANGE_MODES[1] && (
                      <div className="flex flex-col px-2.5 gap-2.5">
                        <div className="flex justify-between items-center">
                          <label htmlFor="pages-input" className="grow-2">
                            Разделить на диапазоны страниц:
                          </label>
                          <div className="grow">
                            <Input
                              id="pages-input"
                              value={fixedRangeSize}
                              onChange={(e) => {
                                setFixedRangeSize(Number(e.target.value));
                              }}
                            ></Input>
                          </div>
                        </div>
                        <InfoText>
                          Этот PDF-файл будет разбит на файлы по 2 стр. в
                          каждом. Будут созданы 75 PDF-файлы.
                        </InfoText>
                      </div>
                    )}
                  </>
                )}
              </div>
            </ToolSidebar>
          }
          workspace={
            <>
              {rangeMode === RANGE_MODES[0] && (
                <DragDropProvider
                  onDragEnd={(event) => {
                    if (event.canceled) return;
                    const { source } = event.operation;
                    if (isSortable(source)) {
                      const { initialIndex, index } = source;
                      if (initialIndex !== index) {
                        setRanges((prev) => {
                          const newItems = [...prev];
                          const [removed] = newItems.splice(initialIndex, 1);
                          newItems.splice(index, 0, removed);
                          return newItems;
                        });
                      }
                    }
                  }}
                >
                  {ranges
                    .filter((r, i) => i < 6)
                    .map((r, index) => (
                      <PdfCardSplit
                        file={files[0].file}
                        index={index}
                        key={r.id}
                        range={r}
                      ></PdfCardSplit>
                    ))}
                </DragDropProvider>
              )}
              {rangeMode === RANGE_MODES[1] && (
                <RangesScrollContainer
                  file={files[0].file}
                  ranges={ranges}
                ></RangesScrollContainer>
              )}
            </>
          }
        ></EditPdfWrapper>
      )}
    </>
  );
}
