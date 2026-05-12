import { IRange } from '@/interfaces/range.interface';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState, useMemo, useEffect } from 'react';
import PdfCardSplit from './PdfCardSplit';
import React from 'react';

export default function ResponsiveGrid({
  items,
  file,
}: {
  items: IRange[];
  file: File;
}) {
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    
  });

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: '400px',
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '500px',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {/* Row {virtualItem.index} */}
              <PdfCardSplit
                file={file}
                index={index}
                key={r.id}
                range={r}
              ></PdfCardSplit>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
