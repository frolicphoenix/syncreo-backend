// controllers/jobController.js
const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
  const { title, description, requirements, budget, skillsRequired, location } = req.body;

  try {
    const job = new Job({
      client: req.user.id,
      title,
      description,
      requirements,
      budget,
      skillsRequired,
      location,
    });

    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('client', 'name');
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('client', 'name');
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  const { title, description, requirements, budget, skillsRequired, location, status } = req.body;

  const jobFields = {};
  if (title) jobFields.title = title;
  if (description) jobFields.description = description;
  if (requirements) jobFields.requirements = requirements;
  if (budget) jobFields.budget = budget;
  if (skillsRequired) jobFields.skillsRequired = skillsRequired;
  if (location) jobFields.location = location;
  if (status) jobFields.status = status;

  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user authorization
    if (job.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, { $set: jobFields }, { new: true });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check user authorization
    if (job.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await job.remove();
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
