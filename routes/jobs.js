// routes/jobs.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

// @route   POST /api/jobs
// @desc    Create a new job
router.post('/', authMiddleware, createJob);

// @route   GET /api/jobs
// @desc    Get all jobs
router.get('/', getJobs);

// @route   GET /api/jobs/:id
// @desc    Get a job by ID
router.get('/:id', getJobById);

// @route   PUT /api/jobs/:id
// @desc    Update a job
router.put('/:id', authMiddleware, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;
