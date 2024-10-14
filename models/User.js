// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['freelancer', 'client', 'admin'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Freelancer-specific fields
    skills: [String],
    experience: String,
    portfolio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork',
      },
    ],
    resume: String, // URL or file path

    // Client-specific fields
    company: String,

    // Common fields
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
