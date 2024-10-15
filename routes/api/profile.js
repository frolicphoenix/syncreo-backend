// routes/api/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/profile/upload-avatar
// @desc    Upload profile picture
// @access  Private
router.post('/upload-avatar', [auth, upload.single('avatar')], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.avatarUrl = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({ avatarUrl: user.avatarUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
