// routes/api/messages.js
const express = require('express');
const router = express.Router();
const auth = require('../auth');
const Message = require('../../models/Message');

// @route   GET api/messages/:recipientId
// @desc    Get messages between current user and recipient
// @access  Private
router.get('/:recipientId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, recipientId: req.params.recipientId },
        { senderId: req.params.recipientId, recipientId: req.user.id },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
