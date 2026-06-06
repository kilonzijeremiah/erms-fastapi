import PDFDocument from "pdfkit";
import fs from "fs";

export const generateReportCard = (student: any, results: any[]) => {
  const doc = new PDFDocument();

  const filePath = `reports/${student.name}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("IKONEX ACADEMY REPORT CARD");
  doc.moveDown();

  doc.fontSize(14).text(`Name: ${student.name}`);
  doc.text(`ID: ${student.id}`);
  doc.moveDown();

  results.forEach((r) => {
    doc.text(`${r.subject}: ${r.marks}`);
  });

  doc.moveDown();
  doc.text(`Average: ${results.reduce((a, b) => a + b.marks, 0) / results.length}`);

  doc.end();

  return filePath;
};