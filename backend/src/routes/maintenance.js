const express = require('express');
const MaintenanceRecord = require('../models/MaintenanceRecord');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { maintenancePredict } = require('../services/mlService');
const { saveRecord } = require('../services/storage');

const router = express.Router();

router.post('/predict', protect, async (req, res) => {
  const result = maintenancePredict(req.body);
  await saveRecord(MaintenanceRecord, { userId: req.user.id, input: req.body, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Smart Maintenance',
    prediction: result.maintenancePriority,
    score: result.maintenancePriority === 'Routine' ? 80 : result.maintenancePriority === 'High' ? 55 : 30,
    riskLevel: result.maintenancePriority,
    recommendation: result.suggestedService,
    sourceModel: result.modelType,
  });
  return res.json({ result });
});

module.exports = router;
