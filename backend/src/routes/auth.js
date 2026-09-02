const express = require('express');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const { handleValidation } = require('../middlewares/validate');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('phone').isLength({ min: 10 }),
  body('password').isLength({ min: 6 }),
], handleValidation, async (req, res, next) => {
  try {
    const { name, email, phone, password, vehicleInformation, role, adminCode } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' && adminCode && adminCode === process.env.ADMIN_INVITE_CODE ? 'admin' : 'user';

    const user = await User.create({ name, email, phone, password: hashed, role: userRole, vehicleInformation });
    const token = signToken({ id: user._id, role: user.role, name: user.name });

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, vehicleInformation: user.vehicleInformation },
    });
  } catch (error) {
    if (error?.name === 'MongooseError' || error?.name === 'MongoServerError') {
      return res.status(503).json({ message: 'Database unavailable. Please try later.' });
    }
    return next(error);
  }
});

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], handleValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken({ id: user._id, role: user.role, name: user.name });
    return res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, vehicleInformation: user.vehicleInformation },
    });
  } catch (error) {
    if (error?.name === 'MongooseError' || error?.name === 'MongoServerError') {
      return res.status(503).json({ message: 'Database unavailable. Please try later.' });
    }
    return next(error);
  }
});

module.exports = router;
