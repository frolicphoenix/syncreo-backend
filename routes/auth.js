// routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role', 'Role is required').notEmpty(),
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

// @route   GET /api/auth/user
// @desc    Get current logged-in user
router.get('/user', authMiddleware, getCurrentUser);

module.exports = router;
