const express = require('express');
const PDFDocument = require('pdfkit');
const EmissionRecord = require('../models/EmissionRecord');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { emissionAnalyze } = require('../services/mlService');
const { saveRecord } = require('../services/storage');

const router = express.Router();

router.post('/analyze', protect, async (req, res) => {
  const result = emissionAnalyze(req.body);
  const record = await saveRecord(EmissionRecord, { userId: req.user.id, input: req.body, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Emission Testing',
    prediction: result.emissionStatus,
    score: result.emissionScore,
    riskLevel: result.emissionStatus,
    recommendation: result.recommendedMaintenance,
    sourceModel: result.modelType,
  });
  return res.json({ result, recordId: record._id });
});

router.get('/report/:id', protect, async (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="emission-report.pdf"');
  doc.pipe(res);
  doc.fontSize(16).text('OnRoad 360 Emission Evaluation Report');
  doc.moveDown();
  doc.fontSize(12).text('Disclaimer: This is an application-level evaluation and not an official government emission certificate.');
  doc.moveDown();
  doc.text(`Generated for User ID: ${req.user.id}`);
  doc.text(`Report Reference: ${req.params.id}`);
  doc.text(`Generated At: ${new Date().toLocaleString()}`);
  doc.end();
});

module.exports = router;
