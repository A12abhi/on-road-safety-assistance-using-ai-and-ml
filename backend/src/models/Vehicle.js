const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleType: String,
  fuelType: String,
  mileage: Number,
  vehicleAge: Number,
  engineCondition: String,
  batteryStatus: String,
  tireCondition: String,
  brakeCondition: String,
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
