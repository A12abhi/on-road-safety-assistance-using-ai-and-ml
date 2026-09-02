const express = require('express');
const { protect } = require('../middlewares/auth');
const { mechanics, fuelStations, safeLocations } = require('../data/sampleLocations');

const router = express.Router();

router.get('/points', protect, async (req, res) => {
  const routeSuggestions = [
    'Service road',
    'Internal road',
    'U-turn pocket',
    'Shoulder lane',
    'Lower-risk route',
  ];
  return res.json({ mechanics, fuelStations, safeLocations, routeSuggestions, source: 'Simulated route and points' });
});

module.exports = router;
