// controllers/userController.js
const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Get user from database
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { name, skills, experience, company } = req.body;

  const profileFields = {};
  if (name) profileFields.name = name;
  if (skills) profileFields.skills = skills;
  if (experience) profileFields.experience = experience;
  if (company) profileFields.company = company;

  try {
    let user = await User.findById(req.user.id);
    if (user) {
      // Update
      user = await User.findByIdAndUpdate(req.user.id, { $set: profileFields }, { new: true });
      return res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
