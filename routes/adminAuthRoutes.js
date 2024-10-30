// src/routes/adminAuthRoutes.js
const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Admin Registration Route
router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if the admin already exists
      const existingAdmin = await User.findOne({ email, role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the admin user
      const admin = new User({ name, email, password: hashedPassword, role: 'admin' });
      await admin.save();

      // Generate a JWT token
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(201).json({
        message: 'Admin registered successfully',
        token,
        user: {
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Admin registration failed' });
    }
  }
);

module.exports = router;
