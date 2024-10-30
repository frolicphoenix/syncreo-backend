// controllers/proposalController.js
const Proposal = require('../models/Proposal');
const Project = require('../models/Project');

// Fetch received proposals for all projects owned by the client
exports.getProposalsForClient = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user.id });
    const projectIds = projects.map(project => project._id);

    const proposals = await Proposal.find({ project: { $in: projectIds } })
      .populate('freelancer', 'name email')
      .populate('project', 'title description');

    res.json(proposals);
  } catch (error) {
    console.error('Error fetching client proposals:', error);
    res.status(500).json({ error: 'Error fetching proposals.' });
  }
};
