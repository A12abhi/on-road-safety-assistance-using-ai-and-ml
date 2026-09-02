const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const emergencyRoutes = require('./routes/emergency');
const behaviorRoutes = require('./routes/behavior');
const vehicleRoutes = require('./routes/vehicleHealth');
const fuelRoutes = require('./routes/fuel');
const maintenanceRoutes = require('./routes/maintenance');
const insuranceRoutes = require('./routes/insurance');
const emissionRoutes = require('./routes/emission');
const diagnosticsRoutes = require('./routes/diagnostics');
const chatRoutes = require('./routes/chat');
const historyRoutes = require('./routes/history');
const adminRoutes = require('./routes/admin');
const mechanicsRoutes = require('./routes/mechanics');
const mapRoutes = require('./routes/map');
const reportRoutes = require('./routes/reports');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*'}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ message: 'OnRoad 360 API active', mode: 'AI/ML simulation supported' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/behavior', behaviorRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/emission', emissionRoutes);
app.use('/api/diagnostics', diagnosticsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mechanics', mechanicsRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
