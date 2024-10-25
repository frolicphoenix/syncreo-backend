// routes/proposalRoutes.js
const express = require('express');
const { submitProposal, getProposalsForProject, getProposalById } = require('../controllers/proposalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/proposals - Submit a new proposal (only for freelancers)
router.post('/', authMiddleware, submitProposal);

// GET /api/proposals/project/:projectId - Get all proposals for a project (for clients)
router.get('/project/:projectId', authMiddleware, getProposalsForProject);

// GET /api/proposals/:id - Get a single proposal by ID
router.get('/:id', authMiddleware, getProposalById);

module.exports = router;
