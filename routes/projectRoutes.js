// routes/projectRoutes.js
const express = require('express');
const { createProject, getAllProjects, getProjectById, searchProjects, getClientProjects } = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

const Project = require('../models/Project');

const router = express.Router();

// POST /api/projects - Create a new project (only for clients)
router.post('/', authMiddleware, createProject);

// GET /api/projects/client-projects - Get projects posted by the authenticated client
router.get('/client-projects', authMiddleware, getClientProjects); // New route for client's projects

// GET /api/projects - Get all projects (for freelancers to view)
router.get('/', authMiddleware, getAllProjects);

// GET /api/projects/:id - Get a single project by ID (details view)
router.get('/:id', authMiddleware, getProjectById);

// GET /api/projects/search - Search projects (available to freelancers)
router.get('/search', authMiddleware, searchProjects);

router.get('/client/:clientId', async (req, res) => {
    try {
      const projects = await Project.find({ client: req.params.clientId });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching client projects' });
    }
});

module.exports = router;
