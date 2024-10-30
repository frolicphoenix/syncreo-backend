// routes/proposalRoutes.js
const express = require('express');
const { getProposalsForClient } = require('../controllers/proposalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all received proposals for projects owned by the client
router.get('/client/received', authMiddleware, getProposalsForClient);

module.exports = router;
