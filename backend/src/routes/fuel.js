const express = require('express');
const FuelPrediction = require('../models/FuelPrediction');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { fuelPredict } = require('../services/mlService');
const { saveRecord } = require('../services/storage');
const { fuelStations } = require('../data/sampleLocations');

const router = express.Router();

router.post('/predict', protect, async (req, res) => {
  const result = fuelPredict(req.body);
  await saveRecord(FuelPrediction, { userId: req.user.id, input: req.body, result });
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Fuel Prediction',
    prediction: result.refuelingStatus,
    score: result.estimatedRemainingRange,
    riskLevel: result.refuelingStatus,
    recommendation: 'Refuel if estimated range is lower than route distance.',
    sourceModel: result.modelType,
  });
  return res.json({ result, nearbyFuelStations: fuelStations, source: 'Sample location data' });
});

module.exports = router;
