const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, param } = require('express-validator');
const multer = require('multer');

const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const EmergencyRequest = require('./models/EmergencyRequest');
const BehaviorAnalysis = require('./models/BehaviorAnalysis');
const VehicleHealth = require('./models/VehicleHealth');
const FuelPrediction = require('./models/FuelPrediction');
const MaintenanceRecord = require('./models/MaintenanceRecord');
const InsuranceRecommendation = require('./models/InsuranceRecommendation');
const EmissionRecord = require('./models/EmissionRecord');
const DiagnosticRecord = require('./models/DiagnosticRecord');
const ChatMessage = require('./models/ChatMessage');
const PredictionHistory = require('./models/PredictionHistory');
const { auth, authorize } = require('./middleware/auth');
const validate = require('./middleware/validate');
const errorHandler = require('./middleware/errorHandler');
const {
  emergencyRisk,
  drivingAnalysis,
  vehicleHealth,
  fuelPrediction,
  maintenancePrediction,
  insuranceRecommendation,
  emissionAnalysis,
  audioDiagnostics,
  mapAssistanceData,
  chatbotResponse,
} = require('./services/mlService');
const { buildPdfBuffer } = require('./utils/pdf');

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev-secret-change-me', {
    expiresIn: '7d',
  });

const savePredictionHistory = async ({ userId, inputType, input, result }) => {
  await PredictionHistory.create({
    user: userId,
    input,
    result: {
      inputType,
      score: result.aiSafetyScore || result.overallVehicleHealthScore || result.emissionScore || result.riskScore || null,
      riskLevel: result.riskLevel || null,
      recommendation: result.recommendedAction || result.refuelingStatus || result.suggestedService || result.recommendedPlan || null,
      result,
    },
  });
};

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post(
  '/api/auth/register',
  [body('name').notEmpty(), body('email').isEmail(), body('phone').notEmpty(), body('password').isLength({ min: 6 })],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, phone, password, vehicle, role } = req.body;
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ message: 'Email already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, phone, password: hashedPassword, vehicle, role: role === 'admin' ? 'admin' : 'user' });

      if (vehicle) {
        await Vehicle.create({ user: user._id, ...vehicle });
      }

      const token = signToken(user);
      return res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, vehicle: user.vehicle },
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post('/api/auth/login', [body('email').isEmail(), body('password').notEmpty()], validate, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = signToken(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, vehicle: user.vehicle },
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/users/profile', auth, async (req, res) => {
  res.json({ user: req.user });
});

app.post(
  '/api/emergency',
  auth,
  [body('currentLocation').notEmpty(), body('destination').notEmpty(), body('vehicleType').notEmpty(), body('emergencyType').notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const result = emergencyRisk(req.body);
      const entry = await EmergencyRequest.create({ user: req.user._id, ...req.body, ...result });
      await savePredictionHistory({ userId: req.user._id, inputType: 'emergency', input: req.body, result });
      res.status(201).json({ message: 'Emergency request submitted.', data: entry, simulated: true });
    } catch (error) {
      next(error);
    }
  }
);

app.get('/api/emergency', auth, async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const data = await EmergencyRequest.find(query).sort({ createdAt: -1 }).populate('user', 'name email phone');
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

app.put('/api/emergency/:id', auth, authorize('admin'), [param('id').isMongoId()], validate, async (req, res, next) => {
  try {
    const entry = await EmergencyRequest.findByIdAndUpdate(req.params.id, { status: req.body.status || 'Processing' }, { new: true });
    if (!entry) return res.status(404).json({ message: 'Request not found.' });
    res.json({ data: entry });
  } catch (error) {
    next(error);
  }
});

const predictionHandler = (model, inputType, predictor) => async (req, res, next) => {
  try {
    const result = predictor(req.body);
    const saved = await model.create({ user: req.user._id, input: req.body, result });
    await savePredictionHistory({ userId: req.user._id, inputType, input: req.body, result });
    res.status(201).json({ data: saved, result, simulated: true });
  } catch (error) {
    next(error);
  }
};

app.post('/api/behavior/analyze', auth, predictionHandler(BehaviorAnalysis, 'driving-analysis', drivingAnalysis));
app.post('/api/vehicle/health', auth, predictionHandler(VehicleHealth, 'vehicle-health', vehicleHealth));
app.post('/api/fuel/predict', auth, predictionHandler(FuelPrediction, 'fuel', fuelPrediction));
app.post('/api/maintenance/predict', auth, predictionHandler(MaintenanceRecord, 'maintenance', maintenancePrediction));
app.post('/api/insurance/recommend', auth, predictionHandler(InsuranceRecommendation, 'insurance', insuranceRecommendation));
app.post('/api/emission/analyze', auth, predictionHandler(EmissionRecord, 'emission', emissionAnalysis));

app.post('/api/diagnostics/audio', auth, upload.single('audio'), async (req, res, next) => {
  try {
    const payload = {
      fileName: req.file?.originalname || req.body.fileName,
      durationSeconds: req.body.durationSeconds,
      roughnessIndex: req.body.roughnessIndex,
    };
    const result = audioDiagnostics(payload);
    const saved = await DiagnosticRecord.create({ user: req.user._id, input: payload, result });
    await savePredictionHistory({ userId: req.user._id, inputType: 'audio-diagnostics', input: payload, result });
    res.status(201).json({ data: saved, result, simulated: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/chat', auth, [body('message').notEmpty()], validate, async (req, res, next) => {
  try {
    const reply = chatbotResponse(req.body.message);
    const saved = await ChatMessage.create({
      user: req.user._id,
      input: { message: req.body.message },
      result: { reply, emergencyEscalation: req.body.escalate === true },
    });
    res.status(201).json({ data: saved, reply, simulated: true });
  } catch (error) {
    next(error);
  }
});

app.get('/api/history', auth, async (req, res, next) => {
  try {
    const { type, riskLevel, date } = req.query;
    const query = { user: req.user._id };
    if (date) {
      const from = new Date(date);
      if (!Number.isNaN(from.getTime())) {
        const nextDay = new Date(from);
        nextDay.setDate(nextDay.getDate() + 1);
        query.createdAt = { $gte: from, $lt: nextDay };
      }
    }

    const records = await PredictionHistory.find(query).sort({ createdAt: -1 });
    const filtered = records.filter((item) => {
      const result = item.result || {};
      if (type && result.inputType !== type) return false;
      if (riskLevel && result.riskLevel !== riskLevel) return false;
      return true;
    });

    res.json({ data: filtered });
  } catch (error) {
    next(error);
  }
});

app.get('/api/mechanics', auth, async (req, res) => {
  res.json({ data: mapAssistanceData().nearbyMechanics, simulated: true });
});

app.post('/api/mechanics/request', auth, [body('mechanicName').notEmpty(), body('issue').notEmpty()], validate, async (req, res, next) => {
  try {
    const result = { status: 'Requested', ...req.body };
    const saved = await MaintenanceRecord.create({ user: req.user._id, input: req.body, result });
    res.status(201).json({ data: saved, message: 'Mechanic assistance requested.' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/map/assistance', auth, async (req, res) => {
  res.json({ data: mapAssistanceData(), simulated: true });
});

app.get('/api/admin/dashboard', auth, authorize('admin'), async (req, res, next) => {
  try {
    const [users, activeEmergency, highRisk, vehicleReports, predictions, maintenance, emission, mechanicRequests, chats] = await Promise.all([
      User.countDocuments(),
      EmergencyRequest.countDocuments({ status: { $ne: 'Closed' } }),
      EmergencyRequest.countDocuments({ riskLevel: { $in: ['High', 'Critical'] } }),
      VehicleHealth.countDocuments(),
      PredictionHistory.countDocuments(),
      MaintenanceRecord.countDocuments(),
      EmissionRecord.countDocuments(),
      MaintenanceRecord.countDocuments({ 'result.status': 'Requested' }),
      ChatMessage.countDocuments(),
    ]);

    const emergencyTable = await EmergencyRequest.find().sort({ createdAt: -1 }).limit(20).populate('user', 'name email');

    res.json({
      data: {
        totalUsers: users,
        activeEmergencyRequests: activeEmergency,
        highRiskCases: highRisk,
        vehicleHealthReports: vehicleReports,
        predictionHistory: predictions,
        maintenanceRecords: maintenance,
        emissionEvaluations: emission,
        mechanicRequests,
        chatInteractions: chats,
        emergencyTable,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/reports/:type/pdf', auth, async (req, res, next) => {
  try {
    const { type } = req.params;
    const buffer = await buildPdfBuffer({
      title: `${type.toUpperCase()} Report`,
      user: req.user,
      vehicle: req.user.vehicle,
      input: req.body.input,
      result: req.body.result,
      disclaimer:
        'Generated by AI-Powered OnRoad 360° Assistance System. This report is informational and may include AI/ML simulation-based outputs.',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${type}-report.pdf"`);
    res.send(buffer);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

module.exports = app;
