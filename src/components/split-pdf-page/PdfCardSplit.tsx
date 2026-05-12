import { IRange } from '@/interfaces/range.interface';
import { useSortable } from '@dnd-kit/react/sortable';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
const PdfCardBase = dynamic(() => import('@/components/common/pdf-card-base'));

interface IProps {
  file: File;
  index: number;
  range: IRange;
}

export default function PdfCardSplit({ file, index, range }: IProps) {
  const { ref } = useSortable({ id: range.id, index });
  const isUltraSlim = useMediaQuery({ maxWidth: 400 });
  return (
    <div ref={ref}>
      <p className="text-center select-none">Диапазон {range.orderNumber}</p>
      <div className="flex gap-2.5 border border-black border-dashed items-center p-2.5">
        <PdfCardBase
          description={range.startPage.toString()}
          file={file}
          pageNumber={range.startPage}
        ></PdfCardBase>
        {!isUltraSlim && range.startPage !== range.endPage && (
          <div className="flex gap-1">
            {new Array(3).fill(null).map((_, i) => (
              <div key={i}>
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="black" />
                </svg>
              </div>
            ))}
          </div>
        )}
        {range.startPage !== range.endPage && (
          <PdfCardBase
            description={range.endPage.toString()}
            file={file}
            pageNumber={range.endPage}
          ></PdfCardBase>
        )}
      </div>
    </div>
  );
}
