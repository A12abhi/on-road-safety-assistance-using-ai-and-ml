const express = require('express');
const PDFDocument = require('pdfkit');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/pdf', protect, async (req, res) => {
  const { reportType, userInformation, vehicleInformation, inputSummary, result, recommendations, disclaimer } = req.body;

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${(reportType || 'report').toLowerCase().replace(/\s+/g, '-')}.pdf"`);
  doc.pipe(res);

  doc.fontSize(18).text(`OnRoad 360 - ${reportType || 'Module'} Report`);
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${new Date().toLocaleString()}`);
  doc.text(`User: ${userInformation?.name || 'N/A'} (${userInformation?.email || 'N/A'})`);
  doc.text(`Vehicle: ${vehicleInformation?.vehicleType || 'N/A'} / ${vehicleInformation?.fuelType || 'N/A'}`);
  doc.moveDown();
  doc.text('Input Summary:');
  doc.text(JSON.stringify(inputSummary || {}, null, 2));
  doc.moveDown();
  doc.text('AI/ML Result:');
  doc.text(JSON.stringify(result || {}, null, 2));
  doc.moveDown();
  doc.text('Recommendations:');
  (recommendations || []).forEach((item, index) => doc.text(`${index + 1}. ${item}`));
  doc.moveDown();
  doc.text(disclaimer || 'This report contains AI/ML and simulation-based informational outputs only.');
  doc.end();
});

module.exports = router;
