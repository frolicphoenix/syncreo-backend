// models/Proposal.js
const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  budget: { type: Number, required: true },
  coverLetter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Proposal', ProposalSchema);
