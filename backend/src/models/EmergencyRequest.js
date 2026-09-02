const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentLocation: String,
  destination: String,
  vehicleType: String,
  emergencyType: String,
  vehicleCondition: String,
  fuelStatus: String,
  drivingBehavior: String,
  description: String,
  riskLevel: String,
  recommendedAction: String,
  nearestSafeLocation: String,
  status: { type: String, default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('EmergencyRequest', emergencySchema);
