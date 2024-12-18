// routes/projectRoutes.js
const express = require('express');
const { createProject, getAllProjects, getProjectById, searchProjects } = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/projects - Create a new project (only for clients)
router.post('/', authMiddleware, createProject);

// GET /api/projects - Get all projects (for freelancers to view)
router.get('/', authMiddleware, getAllProjects);

// GET /api/projects/:id - Get a single project by ID (details view)
router.get('/:id', authMiddleware, getProjectById);

// GET /api/projects/search - Search projects (available to freelancers)
router.get('/search', authMiddleware, searchProjects);

module.exports = router;
