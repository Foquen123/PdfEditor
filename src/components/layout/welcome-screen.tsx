import { useFile } from '@/hooks/useFile';
import { ChangeEvent, ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from '../common/spinner';

export default function WelcomeScreen({
  children,
  handleFileDragDropUpload,
  isLoading,
}: {
  children: ReactNode;
  handleFileDragDropUpload: (files: File[]) => Promise<void>;
  isLoading: boolean;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileDragDropUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="h-full w-full"
      style={{ background: isDragActive ? 'var(--border-color)' : undefined }}
    >
      {isDragActive && <input {...getInputProps()}/>}

      <div className="flex flex-col gap-7.5 items-center  pt-32.5 px-7.5 h-full overflow-y-auto overflow-x-hidden">
        {isLoading && <Spinner></Spinner>}
        {!isLoading && children}
      </div>
    </div>
  );
}
