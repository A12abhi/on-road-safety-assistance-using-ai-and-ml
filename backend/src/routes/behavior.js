const express = require('express');
const { body } = require('express-validator');
const BehaviorAnalysis = require('../models/BehaviorAnalysis');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { handleValidation } = require('../middlewares/validate');
const { behaviorAnalyze } = require('../services/mlService');
const { saveRecord } = require('../services/storage');

const router = express.Router();

router.post('/analyze', protect, [
  body('speedVariation').isNumeric(),
  body('brakingIntensity').isNumeric(),
  body('laneSwitchFrequency').isNumeric(),
], handleValidation, async (req, res) => {
  const result = behaviorAnalyze(req.body);
  await saveRecord(BehaviorAnalysis, { userId: req.user.id, input: req.body, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Driving Analysis',
    prediction: result.drivingBehaviorCategory,
    score: result.aiSafetyScore,
    riskLevel: result.riskLevel,
    recommendation: result.recommendedAction,
    sourceModel: result.modelType,
  });
  return res.json({ result });
});

module.exports = router;
