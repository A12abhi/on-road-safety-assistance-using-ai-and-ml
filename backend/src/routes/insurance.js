const express = require('express');
const InsuranceRecommendation = require('../models/InsuranceRecommendation');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { insuranceRecommend } = require('../services/mlService');
const { saveRecord } = require('../services/storage');

const router = express.Router();

router.post('/recommend', protect, async (req, res) => {
  const result = insuranceRecommend(req.body);
  await saveRecord(InsuranceRecommendation, { userId: req.user.id, input: req.body, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Insurance Advisory',
    prediction: result.recommendation,
    score: null,
    riskLevel: result.recommendation,
    recommendation: result.disclaimer,
    sourceModel: result.modelType,
  });
  return res.json({ result });
});

module.exports = router;
