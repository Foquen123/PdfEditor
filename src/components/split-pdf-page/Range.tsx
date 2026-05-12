import { IRange } from '@/interfaces/range.interface';
import Input from './Input';
import { useSortable } from '@dnd-kit/react/sortable';
import { useRef } from 'react';

interface IProps {
  handleChangeRange: (range: IRange) => void;
  range: IRange;
  pagesCount: number;
  rangeNumber: number;
  index: number;
}

export default function Range({
  handleChangeRange,
  range,
  pagesCount,
  rangeNumber,
  index,
}: IProps) {
  const handleRef = useRef(null);
  const { ref } = useSortable({
    id: range.id,
    index: index,
    handle: handleRef,
  });
  return (
    <div
      ref={ref}
      className="px-2.5 flex flex-col gap-2.5 border-b border-border"
    >
      <p className='cursor-move' ref={handleRef}>Диапазон {rangeNumber}</p>
      <div className="flex gap-2.5 items-center py-3">
        <p>От</p>
        <Input
          value={range.startPage}
          min={1}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > pagesCount || value < 1)
              handleChangeRange({ ...range });
            else
              handleChangeRange({
                ...range,
                startPage: Number(e.target.value),
              });
          }}
        ></Input>
        <p>До</p>
        <Input
          value={range.endPage}
          max={pagesCount}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > pagesCount || value < 1)
              handleChangeRange({ ...range });
            else
              handleChangeRange({
                ...range,
                endPage: Number(e.target.value),
              });
          }}
        ></Input>
      </div>
    </div>
  );
}
