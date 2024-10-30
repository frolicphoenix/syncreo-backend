const Message = require('../models/Message');

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const message = await Message.create({
      sender: req.user.id,
      recipient: recipientId,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};

// Get message thread between two users
exports.getMessageThread = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: userId },
        { sender: userId, recipient: req.user.id },
      ],
    })
      .sort({ createdAt: 1 }) // Sort messages in ascending order
      .populate('sender', 'name email')
      .populate('recipient', 'name email');

    res.json(messages);
  } catch (error) {
    console.error('Error retrieving message thread:', error);
    res.status(500).json({ error: 'Error retrieving message thread' });
  }
};
