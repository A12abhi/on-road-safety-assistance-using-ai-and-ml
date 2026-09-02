const express = require('express');
const VehicleHealth = require('../models/VehicleHealth');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { vehicleHealth } = require('../services/mlService');
const { saveRecord } = require('../services/storage');

const router = express.Router();

router.post('/health', protect, async (req, res) => {
  const result = vehicleHealth(req.body);
  await saveRecord(VehicleHealth, { userId: req.user.id, input: req.body, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Vehicle Health',
    prediction: result.maintenancePriority,
    score: result.overallVehicleHealthScore,
    riskLevel: result.maintenancePriority,
    recommendation: result.recommendations?.[0],
    sourceModel: result.modelType,
  });
  return res.json({ result });
});

module.exports = router;
