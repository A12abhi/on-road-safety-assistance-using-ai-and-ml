const { Schema } = require('mongoose');

const resultSchema = {
  score: Number,
  riskLevel: String,
  category: String,
  status: String,
  recommendation: String,
  explanation: String,
  modelType: String,
  analysisMode: { type: String, default: 'AI/ML simulation layer' },
};

const withTimestamps = { timestamps: true };

module.exports = { Schema, resultSchema, withTimestamps };
