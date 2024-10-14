// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['in progress', 'completed', 'closed'],
      default: 'in progress',
    },
    milestones: [
      {
        title: String,
        description: String,
        dueDate: Date,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
