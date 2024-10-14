// models/Proposal.js
const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: String,
    bidAmount: Number,
    status: {
      type: String,
      enum: ['submitted', 'accepted', 'rejected'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Proposal', ProposalSchema);
