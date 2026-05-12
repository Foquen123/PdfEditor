import { PDFDocument } from 'pdf-lib';

export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const fileBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const copiedPages = await mergedPdf.copyPages(
      pdfDoc,
      pdfDoc.getPageIndices(),
    );
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }
  const mergedPdfBytes = await mergedPdf.save();

  return new Blob([mergedPdfBytes as BlobPart], {
    type: 'application/pdf',
  });
}

export async function convertFilesToDownload(files: File[]): Promise<Blob[]> {
  const array: Blob[] = [];
  for (const file of files) {
    const fileBuffer = await file.arrayBuffer();
    const blob = new Blob([fileBuffer as BlobPart], {
      type: 'application/pdf',
    });
    array.push(blob);
  }
  return array;
}

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return;
}

export async function splitPdf(
  file: File,
  startPage: number,
  endPage: number,
): Promise<Blob> {
  const sourcePdf = await PDFDocument.load(await file.arrayBuffer());

  const newPdf = await PDFDocument.create();

  // Копируем нужные страницы (страницы в pdf-lib индексируются с 0)
  const pageIndices = [];
  for (let i = startPage - 1; i <= endPage - 1; i++) {
    pageIndices.push(i);
  }

  // Копируем выбранные страницы
  const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);

  // Добавляем скопированные страницы в новый документ
  copiedPages.forEach((page) => newPdf.addPage(page));

  // Сохраняем результат
  const resultBytes = await newPdf.save();
  return new Blob([resultBytes as BlobPart], {
    type: 'application/pdf',
  });
}

export async function mergePdfBlobs(blobs: Blob[]) {
  const mergedPdf = await PDFDocument.create();

  for (const blob of blobs) {
    const arrayBuffer = await blob.arrayBuffer();

    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const copiedPages = await mergedPdf.copyPages(
      pdfDoc,
      pdfDoc.getPageIndices(),
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();

  return new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' });
}

