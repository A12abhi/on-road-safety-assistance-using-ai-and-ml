const mongoose = require('mongoose');

const diagnosticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: String,
  duration: Number,
  result: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('DiagnosticRecord', diagnosticsSchema);
