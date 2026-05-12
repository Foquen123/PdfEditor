import { IRange } from '@/interfaces/range.interface';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';
import PdfCardSplit from './PdfCardSplit';
import { useMediaQuery } from 'react-responsive';

type ExampleType = {
  caption: string;
  source: string;
  imageHeight: number;
  imageWidth: number;
};
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Item = { id: number; name: string };

export default function RangesScrollContainer({
  file,
  ranges,
}: {
  ranges: IRange[];
  file: File;
}) {
  const [items, setItems] = useState<IRange[]>(ranges.slice(0, 10));
  const init = useRef(true);
  useEffect(() => {
    if (init) setItems(ranges.slice(0, 10));
  }, [ranges]);

  const [hasMore, setHasMore] = useState(true);

  const fetchMore = async () => {
    // const next = await api.getItems({ offset: items.length });
    const next: IRange[] = ranges.slice(items.length, items.length + 10);
    if (next.length === 0) {
      setHasMore(false);
      return;
    }
    setItems((prev) => [...prev, ...next]);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={undefined}
      endMessage={undefined}
    >
      <div className="flex flex-wrap justify-center gap-2.5">
        {items.map((item, index) => (
          <PdfCardSplit
            file={file}
            index={index}
            key={item.id}
            range={item}
          ></PdfCardSplit>
        ))}
      </div>
    </InfiniteScroll>
  );
}
