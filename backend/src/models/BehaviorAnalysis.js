const mongoose = require('mongoose');

const behaviorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  input: mongoose.Schema.Types.Mixed,
  result: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('BehaviorAnalysis', behaviorSchema);
