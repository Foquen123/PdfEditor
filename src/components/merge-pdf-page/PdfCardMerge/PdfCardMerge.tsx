import { useEffect, useMemo, useRef, useState } from 'react';
import { pdfjs, Thumbnail } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import styles from './PdfCardMerge.module.css';
import { useSortable } from '@dnd-kit/react/sortable';
// import PdfCardBase from '../../common/pdf-card-base';
import dynamic from 'next/dynamic';

const PdfCardBase = dynamic(() => import('@/components/common/pdf-card-base'));

interface IProps {
  file: File;
  onDelete: () => void;
  id: string;
  index: number;
}

export default function PdfCardMerge({ id, index, file, onDelete }: IProps) {
  const { ref } = useSortable({ id, index });

  return (
    <div ref={ref} className="relative group">
      <button
        onClick={onDelete}
        className={`${styles['close-btn']} hidden group-hover:block absolute top-5.5 right-5.5 z-10 cursor-pointer hover:fill-accent`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#CCD4DA"
            fillOpacity="0.41"
          />
          <path
            d="M15 9L9 15"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9L15 15"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <PdfCardBase
        description={file.name}
        file={file}
        pageNumber={1}
      ></PdfCardBase>
    </div>
  );
}
