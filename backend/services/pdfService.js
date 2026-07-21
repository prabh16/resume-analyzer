import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

export const extractTextFromPdf = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = new Uint8Array(buffer);
  const loadingTask = getDocument({ data, useSystemFonts: true });
  const pdfDocument = await loadingTask.promise;

  let text = '';

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    const page = await pdfDocument.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ');
    text += `${pageText}\n`;
  }

  text = text.trim();

  if (!text || text.length < 50) {
    throw new Error(
      'Could not extract enough text from this PDF. It may be scanned, image-based, or unreadable.'
    );
  }

  return text;
};

export const deleteFileIfExists = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
