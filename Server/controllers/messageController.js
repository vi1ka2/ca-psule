// server/controllers/messageController.js
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
