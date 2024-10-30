// routes/proposalRoutes.js
const express = require('express');
const { submitProposal, getProposalsForFreelancer, getProposalsForClient } = require('../controllers/proposalController');
const authMiddleware = require('../middlewares/authMiddleware'); // Use authMiddleware instead

const router = express.Router();

// Submit a proposal (freelancers only)
router.post('/', authMiddleware, submitProposal);

// Get all submitted proposals for the logged-in freelancer
router.get('/freelancer/:freelancerId', authMiddleware, getProposalsForFreelancer);

// Get all received proposals for the logged-in client
router.get('/client/:clientId', authMiddleware, getProposalsForClient);

module.exports = router;
