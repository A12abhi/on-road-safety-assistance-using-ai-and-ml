const { dbState } = require('../config/db');

const memoryStore = {
  EmergencyRequest: [],
  BehaviorAnalysis: [],
  VehicleHealth: [],
  FuelPrediction: [],
  MaintenanceRecord: [],
  InsuranceRecommendation: [],
  EmissionRecord: [],
  DiagnosticRecord: [],
  PredictionHistory: [],
  MechanicRequest: [],
  ChatMessage: [],
};

const id = () => Math.random().toString(36).slice(2, 11);

const saveRecord = async (Model, payload) => {
  const key = Model.modelName;
  if (dbState.connected) {
    try {
      const doc = await Model.create(payload);
      return doc;
    } catch {
      dbState.connected = false;
    }
  }
  const fallback = { _id: id(), ...payload, createdAt: new Date(), updatedAt: new Date() };
  if (memoryStore[key]) memoryStore[key].unshift(fallback);
  return fallback;
};

const listRecords = async (Model, filter = {}, limit = 20) => {
  if (dbState.connected) {
    try {
      return await Model.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    } catch {
      dbState.connected = false;
    }
  }
  const key = Model.modelName;
  const store = memoryStore[key] || [];
  return store.filter((row) => Object.keys(filter).every((k) => String(row[k]) === String(filter[k]))).slice(0, limit);
};

const updateRecord = async (Model, id, updates) => {
  if (dbState.connected) {
    try {
      return await Model.findByIdAndUpdate(id, updates, { new: true });
    } catch {
      dbState.connected = false;
    }
  }
  const key = Model.modelName;
  const row = (memoryStore[key] || []).find((r) => String(r._id) === String(id));
  if (!row) return null;
  Object.assign(row, updates, { updatedAt: new Date() });
  return row;
};

module.exports = { saveRecord, listRecords, updateRecord, memoryStore };
