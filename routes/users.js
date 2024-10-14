// routes/users.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// @route   GET /api/users/profile
// @desc    Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
