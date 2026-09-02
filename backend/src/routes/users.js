const express = require('express');
const User = require('../models/User');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
