// index.js
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function createPDFsFromImages(imageDir) {
  const imageFiles = fs.readdirSync(imageDir).filter(file => file.endsWith('.jpg'));
  const pdfPaths = [];

  for (const imageFile of imageFiles) {
    const pdfDoc = await PDFDocument.create();
    const imagePath = path.join(imageDir, imageFile);
    const imageBytes = fs.readFileSync(imagePath);
    const image = await pdfDoc.embedJpg(imageBytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(imageDir, `${path.basename(imageFile, '.jpg')}.pdf`);
    fs.writeFileSync(pdfPath, pdfBytes);
    pdfPaths.push(pdfPath);
  }

  return pdfPaths;
}

async function mergePDFs(pdfPaths, outputFilePath) {
  const mergedPdf = await PDFDocument.create();

  for (const pdfPath of pdfPaths) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputFilePath, mergedPdfBytes);
}

async function main() {
  const imageDir = process.argv[2];
  if (!imageDir) {
    console.error('Please provide the directory containing the images.');
    process.exit(1);
  }

  const pdfPaths = await createPDFsFromImages(imageDir);
  await mergePDFs(pdfPaths, path.join(imageDir, 'output.pdf'));
  console.log('PDFs created and merged into output.pdf');
}

main().catch(err => console.error(err));

