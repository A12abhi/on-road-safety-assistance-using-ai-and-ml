const mongoose = require('mongoose');

const vehicleInfoSchema = new mongoose.Schema({
  vehicleNumber: String,
  vehicleType: String,
  fuelType: String,
  mileage: Number,
  vehicleAge: Number,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  vehicleInformation: vehicleInfoSchema,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
