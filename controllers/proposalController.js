const Proposal = require('../models/Proposal');
const Project = require('../models/Project');

// Submit a new proposal (only for freelancers)
exports.submitProposal = async (req, res) => {
  try {
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ error: 'Only freelancers can submit proposals' });
    }

    const { projectId, budget, coverLetter } = req.body;
    const proposal = await Proposal.create({
      freelancer: req.user.id,
      project: projectId,
      budget,
      coverLetter,
    });
    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'Error submitting proposal' });
  }
};

// Get submitted proposals for a freelancer
exports.getProposalsForFreelancer = async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.user.id })
      .populate('project', 'title'); // Populate project title
    res.json(proposals);
  } catch (error) {
    console.error('Error retrieving freelancer proposals:', error);
    res.status(500).json({ error: 'Error retrieving proposals' });
  }
};

// Get received proposals for all projects owned by a client
exports.getProposalsForClient = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user.id });
    const projectIds = projects.map((project) => project._id);
    
    const proposals = await Proposal.find({ project: { $in: projectIds } })
      .populate('freelancer', 'name email') // Populate freelancer name and email
      .populate('project', 'title'); // Populate project title
    res.json(proposals);
  } catch (error) {
    console.error('Error retrieving client proposals:', error);
    res.status(500).json({ error: 'Error retrieving proposals' });
  }
};

// Get a single proposal by ID
exports.getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('freelancer', 'name email');
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving proposal' });
  }
};
