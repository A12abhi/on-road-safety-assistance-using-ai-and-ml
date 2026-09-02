const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentLocation: { type: String, required: true },
    destination: { type: String, required: true },
    vehicleType: { type: String, required: true },
    emergencyType: { type: String, required: true },
    vehicleCondition: String,
    fuelStatus: String,
    drivingBehavior: String,
    description: String,
    riskLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], required: true },
    riskScore: { type: Number, required: true },
    status: { type: String, enum: ['Open', 'Accepted', 'Processing', 'Closed'], default: 'Open' },
    assistanceOptions: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);
