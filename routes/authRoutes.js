const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['freelancer', 'client'])
], register);

// Login Route
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

module.exports = router;
