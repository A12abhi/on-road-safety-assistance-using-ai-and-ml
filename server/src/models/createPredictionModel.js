const mongoose = require('mongoose');

const createPredictionModel = (name) => {
  const schema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      input: { type: mongoose.Schema.Types.Mixed, required: true },
      result: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
  );

  return mongoose.model(name, schema);
};

module.exports = createPredictionModel;
