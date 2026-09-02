const mongoose = require('mongoose');

const dbState = { connected: false };
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI not set: running in simulation persistence mode.');
    return;
  }

  try {
    await mongoose.connect(uri, { dbName: process.env.MONGO_DB_NAME || 'onroad360' });
    dbState.connected = true;
    console.log('MongoDB connected');
  } catch (error) {
    dbState.connected = false;
    console.warn('MongoDB connection failed, simulation persistence mode enabled.');
  }
};

module.exports = { connectDB, dbState };
