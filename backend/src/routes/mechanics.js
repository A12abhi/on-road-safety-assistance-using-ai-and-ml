const express = require('express');
const MechanicRequest = require('../models/MechanicRequest');
const { protect } = require('../middlewares/auth');
const { mechanics } = require('../data/sampleLocations');
const { saveRecord, listRecords } = require('../services/storage');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  return res.json({ mechanics, source: 'Sample location data' });
});

router.post('/request', protect, async (req, res) => {
  const { mechanicName, serviceType, location, note } = req.body;
  if (!mechanicName || !serviceType || !location) {
    return res.status(400).json({ message: 'mechanicName, serviceType and location are required' });
  }
  const request = await saveRecord(MechanicRequest, { userId: req.user.id, mechanicName, serviceType, location, note });
  return res.status(201).json({ message: 'Mechanic assistance requested', request });
});

router.get('/requests', protect, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
  const requests = await listRecords(MechanicRequest, filter, 100);
  return res.json({ requests });
});

module.exports = router;
