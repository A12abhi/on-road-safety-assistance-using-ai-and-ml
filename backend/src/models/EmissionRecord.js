const mongoose = require('mongoose');

const emissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  input: mongoose.Schema.Types.Mixed,
  result: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('EmissionRecord', emissionSchema);
