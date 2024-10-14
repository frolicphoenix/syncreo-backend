// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    description: String,
    requirements: [String],
    budget: Number,
    skillsRequired: [String],
    location: String,
    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal',
      },
    ],
    status: {
      type: String,
      enum: ['open', 'in progress', 'completed', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
