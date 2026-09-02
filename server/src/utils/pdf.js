const PDFDocument = require('pdfkit');

const buildPdfBuffer = ({ title, user, vehicle, input, result, disclaimer }) =>
  new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 36 });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(18).text(title, { underline: true });
    doc.moveDown();
    doc.fontSize(11).text(`Date: ${new Date().toLocaleString()}`);
    doc.text(`User: ${user?.name || 'N/A'} (${user?.email || 'N/A'})`);
    doc.text(`Vehicle: ${vehicle?.vehicleType || 'N/A'} / ${vehicle?.fuelType || 'N/A'}`);

    doc.moveDown();
    doc.fontSize(13).text('Input Summary');
    doc.fontSize(10).text(JSON.stringify(input || {}, null, 2));

    doc.moveDown();
    doc.fontSize(13).text('AI/ML Result');
    doc.fontSize(10).text(JSON.stringify(result || {}, null, 2));

    doc.moveDown();
    doc.fontSize(10).fillColor('gray').text(disclaimer || 'This report is informational and simulation-supported where applicable.');

    doc.end();
  });

module.exports = { buildPdfBuffer };
