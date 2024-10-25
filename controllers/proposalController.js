// controllers/proposalController.js
const Proposal = require('../models/Proposal');

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

// Get all proposals for a specific project (only for the client who owns the project)
exports.getProposalsForProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const proposals = await Proposal.find({ project: projectId }).populate('freelancer', 'name email');
    res.json(proposals);
  } catch (error) {
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
