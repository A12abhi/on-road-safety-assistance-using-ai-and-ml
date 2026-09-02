const express = require('express');
const multer = require('multer');
const DiagnosticRecord = require('../models/DiagnosticRecord');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { audioDiagnostics } = require('../services/mlService');
const { saveRecord } = require('../services/storage');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/audio', protect, upload.single('audio'), async (req, res) => {
  const fileName = req.file?.originalname || req.body.fileName || 'sample-audio.wav';
  const duration = Number(req.body.duration || 12);
  const result = audioDiagnostics({ fileName, duration });
  await saveRecord(DiagnosticRecord, { userId: req.user.id, fileName, duration, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Audio Diagnostics',
    prediction: result.possibleEngineCondition,
    score: Math.round(result.confidenceIndicator * 100),
    riskLevel: result.confidenceIndicator > 0.8 ? 'Moderate' : 'Low',
    recommendation: result.suggestedAction,
    sourceModel: result.modelType,
  });
  return res.json({ result });
});

module.exports = router;
