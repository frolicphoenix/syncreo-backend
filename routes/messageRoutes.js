// routes/messageRoutes.js
const express = require('express');
const { sendMessage, getMessageThread } = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/messages - Send a new message
router.post('/', authMiddleware, sendMessage);

// GET /api/messages/thread/:userId - Get message thread with a specific user
router.get('/thread/:userId', authMiddleware, getMessageThread);

module.exports = router;
