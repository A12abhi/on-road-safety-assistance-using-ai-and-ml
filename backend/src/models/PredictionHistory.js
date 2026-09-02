const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inputType: String,
  prediction: String,
  score: Number,
  riskLevel: String,
  recommendation: String,
  sourceModel: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('PredictionHistory', historySchema);
