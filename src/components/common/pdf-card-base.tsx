'use client';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { useEffect, useMemo, useRef } from 'react';
import { Document, Page, pdfjs, Thumbnail } from 'react-pdf';
import { useMediaQuery } from 'react-responsive';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface IProps {
  file: File;
  description: string;
  pageNumber: number;
}

export default function PdfCardBase({ file, description, pageNumber }: IProps) {
  const fileUrlRef = useRef<string>('');
  const fileUrl = useMemo(() => {
    const newUrl = URL.createObjectURL(file);
    return newUrl;
  }, [file]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) {
        URL.revokeObjectURL(fileUrlRef.current);
      }
    };
  }, [fileUrl]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex w-34.25 h-47  md:h-63.5 md:w-47.5 flex-col px-4 pt-4 pb-1  md:px-8 md:pt-8.5 md:pb-3 gap-3 bg-primary rounded-[15px] drop-shadow-xl hover:outline-[1px] outline-text z-0 hover:cursor-move group relative"
    >
      <div
        className="drop-shadow-xl [&_a]:pointer-events-none [&_a]:cursor-move [&_.react-pdf__Thumbnail__page__canvas]:cursor-move [&_.react-pdf__Thumbnail__page]:cursor-move [&_canvas]:cursor-move"
        onClick={(e) => e.stopPropagation()}
      >
        <Document onItemClick={() => {}} file={fileUrl}>
          <Thumbnail
            pageNumber={pageNumber}
            width={isMobile ? 98 : 126}
            height={isMobile ? 140 : 180}
            renderMode="canvas"
          ></Thumbnail>
        </Document>
      </div>
      <p className="text-[12px] font-light truncate select-none text-center">
        {description}
      </p>
    </div>
  );
}
