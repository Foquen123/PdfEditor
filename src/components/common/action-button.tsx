'use client';

import { ButtonHTMLAttributes, ChangeEvent, useState } from 'react';
import PageDescription from './page-description';
import PageTitle from './page-title';

interface IProps {
  children: React.ReactNode;
  handleClick?: () => void;
  size?: 'big' | 'medium' | 'small' | 'icon';
  handleFileUpload?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  disabled?: boolean;
}

export default function ActionButton({
  children,
  handleClick,
  size = 'big',
  handleFileUpload,
  disabled = false,
}: IProps) {
  return (
    <>
      {handleFileUpload && (
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="pdf-upload"
        />
      )}
      <label
        // className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        className={`${size === 'big' && 'py-5.5 text-[24px] px-10.25 '}
          ${size === 'medium' && 'py-4.5 text-[20px] px-10.25 '}
          ${size === 'icon' && 'w-10 h-10 flex justify-center items-center rounded-[100%]'}
          ${disabled && 'opacity-30 select-none pointer-events-none'}
          flex items-center justify-center bg-accent rounded-[10px]
          text-primary font-normal 
          cursor-pointer hover:bg-red-800 transition-all`}
        htmlFor={handleFileUpload && 'pdf-upload'}
        onClick={handleClick && handleClick}
      >
        {children}
      </label>
    </>
  );
}
