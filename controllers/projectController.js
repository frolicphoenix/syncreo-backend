const Project = require('../models/Project');

// Create a new project (only for clients)
exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ error: 'Only clients can post projects' });
    }

    const { title, description, budget } = req.body;
    const project = await Project.create({
      title,
      description,
      budget,
      client: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
};

// Get all projects (for freelancers to view)
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate('client', 'name email');
    //   console.log('Fetched Projects:', projects);  
      if (!projects || projects.length === 0) {
        return res.status(404).json({ error: 'No projects found' });
      }
      res.json(projects);
    } catch (error) {
      console.error('Error retrieving projects:', error);
      res.status(500).json({ error: 'Error retrieving projects' });
    }
  };

// Get a single project by ID (details view)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('client', 'name email');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving project' });
  }
};

// Search for projects (available to freelancers)
exports.searchProjects = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query parameter
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Find projects where title or description contains the query (case insensitive)
    const projects = await Project.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('client', 'name email');

    res.json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error.message); // Log the specific error message
    res.status(500).json({ error: 'Error retrieving projects' });
  }
};

// Function to get projects posted by the authenticated client
exports.getClientProjects = async (req, res) => {
  try {
    const { clientId } = req.params;
    const projects = await Project.find({ client: clientId });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching client projects:', error);
    res.status(500).json({ error: 'Error fetching client projects' });
  }
};