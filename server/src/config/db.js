const mongoose = require('mongoose');

const connectDb = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onroad360';
  await mongoose.connect(uri);
};

module.exports = connectDb;
