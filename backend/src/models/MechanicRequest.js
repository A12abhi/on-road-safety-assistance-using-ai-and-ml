const mongoose = require('mongoose');

const mechanicRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mechanicName: String,
  serviceType: String,
  location: String,
  status: { type: String, default: 'requested' },
  note: String,
}, { timestamps: true });

module.exports = mongoose.model('MechanicRequest', mechanicRequestSchema);
