const express = require('express');
const { body } = require('express-validator');
const EmergencyRequest = require('../models/EmergencyRequest');
const PredictionHistory = require('../models/PredictionHistory');
const { protect, authorize } = require('../middlewares/auth');
const { handleValidation } = require('../middlewares/validate');
const { emergencyRisk } = require('../services/mlService');
const { saveRecord, listRecords, updateRecord } = require('../services/storage');

const router = express.Router();

router.post('/', protect, [
  body('currentLocation').notEmpty(),
  body('destination').notEmpty(),
  body('vehicleType').notEmpty(),
  body('emergencyType').notEmpty(),
  body('description').notEmpty(),
], handleValidation, async (req, res) => {
  const result = emergencyRisk(req.body);
  const payload = {
    ...req.body,
    userId: req.user.id,
    riskLevel: result.riskLevel,
    recommendedAction: result.recommendedAction,
    nearestSafeLocation: result.nearestSafeLocation,
  };
  const saved = await saveRecord(EmergencyRequest, payload);
  await saveRecord(PredictionHistory, {
    userId: req.user.id,
    inputType: 'Emergency Assistance',
    prediction: result.riskLevel,
    score: result.riskScore,
    riskLevel: result.riskLevel,
    recommendation: result.recommendedAction,
    sourceModel: result.modelType,
  });

  return res.status(201).json({ message: 'Emergency request submitted', request: saved, result });
});

router.get('/', protect, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
  const requests = await listRecords(EmergencyRequest, filter, 50);
  return res.json({ requests });
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
  const updated = await updateRecord(EmergencyRequest, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Request not found' });
  return res.json({ message: 'Emergency request updated', request: updated });
});

module.exports = router;
