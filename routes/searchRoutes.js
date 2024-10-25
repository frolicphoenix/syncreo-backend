// routes/searchRoutes.js
const express = require('express');
const { searchFreelancers } = require('../controllers/searchController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/search/freelancers - Search freelancers (available to clients)
router.get('/freelancers', authMiddleware, searchFreelancers);

module.exports = router;
