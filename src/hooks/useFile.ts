import { PdfFile } from '@/interfaces/pdfFile.interface';
import { IRange } from '@/interfaces/range.interface';
import {
  convertFilesToDownload,
  downloadBlob,
  mergePdfBlobs,
  mergePDFs,
  splitPdf,
} from '@/utils/pdf';
import { PDFDocument } from 'pdf-lib';
import { ChangeEvent, useState } from 'react';
import { v4 } from 'uuid';
import * as pdfjsLib from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';

export const useFile = ({ manyUpload = true }: { manyUpload?: boolean }) => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const files = event.target.files ? Array.from(event.target.files) : [];
    if (!manyUpload) files.splice(1);
    const newPdfFiles: PdfFile[] = [];
    for (const file of files) {
      if (file.type !== 'application/pdf') {
        setError(`Файл "${file.name}" не является PDF`);
        continue;
      }

      const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
      newPdfFiles.push({
        id: v4(),
        file: file,
        pagesCount: pdfDoc.getPageCount(),
      });
    }

    setFiles((prev) => [...prev, ...newPdfFiles]);
    setIsLoading(false);
  };

  const handeFilesDragDropUpload = async (uploadedFiles: File[]) => {
    setIsLoading(true);
    if (!manyUpload) uploadedFiles.splice(1);
    const newPdfFiles: PdfFile[] = [];
    for (const file of uploadedFiles) {
      if (file.type !== 'application/pdf') {
        setError(`Файл "${file.name}" не является PDF`);
        console.log('not pdf');
        continue;
      }

      const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
      newPdfFiles.push({
        id: v4(),
        file: file,
        pagesCount: pdfDoc.getPageCount(),
      });
    }

    setFiles((prev) => [...prev, ...newPdfFiles]);
    setIsLoading(false);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (initialIndex: number, index: number) => {
    if (initialIndex !== index) {
      setFiles((prev) => {
        const newItems = [...prev];
        const [removed] = newItems.splice(initialIndex, 1);
        newItems.splice(index, 0, removed);
        return newItems;
      });
    }
  };

  const downloadMergePdf = async (filename: string) => {
    setIsLoading(true);
    const blob = await mergePDFs(files.map((f) => f.file));
    await downloadBlob(blob, filename);
    setIsLoading(false);
  };

  const downloadMultiFiles = async () => {
    const blobs = await convertFilesToDownload(files.map((f) => f.file));
    for (const blob of blobs) {
      await downloadBlob(blob, '1.pdf');
    }
  };

  const downloadSplitPdf = async (
    ranges: IRange[],
    mergeFiles: boolean = false,
  ) => {
    setIsLoading(true);
    const blobs: Blob[] = [];
    for (const range of ranges) {
      const blob = await splitPdf(
        files[0].file,
        range.startPage,
        range.endPage,
      );
      if (mergeFiles) {
        blobs.push(blob);
      }
      if (!mergeFiles) {
        await downloadBlob(blob, files[0].file.name);
      }
    }
    if (mergeFiles) {
      const resultBlob = await mergePdfBlobs(blobs);
      await downloadBlob(resultBlob, files[0].file.name);
    }
    setIsLoading(false);
  };

  async function compressAndDownload(quality = 0.6, scale = 1.5) {
    const arrayBuffer = await files[0].file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
    });
    const compressedBlob = new Blob(
      [
        pdfBytes.buffer.slice(
          pdfBytes.byteOffset,
          pdfBytes.byteOffset + pdfBytes.byteLength,
        ) as BlobPart,
      ],
      { type: 'application/pdf' },
    );

    await downloadBlob(compressedBlob, 'compressed.pdf');
  }

  return {
    files,
    isLoading,
    error,
    removeFile,
    handleFileUpload,
    moveFile,
    downloadMergePdf,
    downloadMultiFiles,
    downloadSplitPdf,
    compressAndDownload,
    handeFilesDragDropUpload,
  };
};
