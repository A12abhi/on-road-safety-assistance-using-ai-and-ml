const express = require('express');
const User = require('../models/User');
const EmergencyRequest = require('../models/EmergencyRequest');
const VehicleHealth = require('../models/VehicleHealth');
const PredictionHistory = require('../models/PredictionHistory');
const MaintenanceRecord = require('../models/MaintenanceRecord');
const EmissionRecord = require('../models/EmissionRecord');
const MechanicRequest = require('../models/MechanicRequest');
const ChatMessage = require('../models/ChatMessage');
const { protect, authorize } = require('../middlewares/auth');
const { listRecords } = require('../services/storage');

const router = express.Router();

router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  const [
    users,
    emergency,
    health,
    history,
    maintenance,
    emission,
    mechanic,
    chat,
  ] = await Promise.all([
    User.countDocuments().catch(() => 0),
    listRecords(EmergencyRequest, {}, 200),
    listRecords(VehicleHealth, {}, 200),
    listRecords(PredictionHistory, {}, 200),
    listRecords(MaintenanceRecord, {}, 200),
    listRecords(EmissionRecord, {}, 200),
    listRecords(MechanicRequest, {}, 200),
    listRecords(ChatMessage, {}, 200),
  ]);

  const highRiskCases = emergency.filter((e) => ['High', 'Critical'].includes(e.riskLevel)).length;
  const activeEmergencyRequests = emergency.filter((e) => e.status !== 'closed').length;

  return res.json({
    totals: {
      totalUsers: users,
      activeEmergencyRequests,
      highRiskCases,
      vehicleHealthReports: health.length,
      predictionHistory: history.length,
      maintenanceRecords: maintenance.length,
      emissionEvaluations: emission.length,
      mechanicRequests: mechanic.length,
      chatInteractions: chat.length,
    },
    emergencyRequests: emergency.slice(0, 20).map((e) => ({
      requestId: e._id,
      user: e.userId,
      emergencyType: e.emergencyType,
      riskLevel: e.riskLevel,
      location: e.currentLocation,
      time: e.createdAt,
      status: e.status,
      action: 'View/Accept/Process/Close',
    })),
  });
});

module.exports = router;
