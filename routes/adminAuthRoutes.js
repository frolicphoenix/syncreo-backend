// src/routes/adminAuthRoutes.js
const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email and check for 'admin' role
      const user = await User.findOne({ email, role: 'admin' }).select('+password');

      if (!user) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
      }

      // Compare password with hashed password in database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      // Generate a JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
