// controllers/searchController.js
const User = require('../models/User');

// Search for freelancers (available to clients)
exports.searchFreelancers = async (req, res) => {
  try {
    const { query } = req.query;

    // Find freelancers where name or email matches the query
    const freelancers = await User.find({
      role: 'freelancer',
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('name email');

    res.json(freelancers);
  } catch (error) {
    console.error('Error searching freelancers:', error);
    res.status(500).json({ error: 'Error searching freelancers' });
  }
};
