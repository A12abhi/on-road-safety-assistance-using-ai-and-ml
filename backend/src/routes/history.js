const express = require('express');
const PredictionHistory = require('../models/PredictionHistory');
const { protect } = require('../middlewares/auth');
const { listRecords } = require('../services/storage');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const { riskLevel, inputType } = req.query;
  let records = await listRecords(PredictionHistory, req.user.role === 'admin' ? {} : { userId: req.user.id }, 200);

  if (riskLevel) records = records.filter((r) => String(r.riskLevel).toLowerCase() === String(riskLevel).toLowerCase());
  if (inputType) records = records.filter((r) => String(r.inputType).toLowerCase().includes(String(inputType).toLowerCase()));

  return res.json({ records });
});

module.exports = router;
