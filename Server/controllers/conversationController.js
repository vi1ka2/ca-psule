const Conversation = require('../models/Conversation');
const User = require('../models/User');

exports.createConversation = async (req, res) => {
  try {
    const { participants } = req.body; // array of user IDs
    // Optional: Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: participants }
    });
    if (!conversation) {
      conversation = new Conversation({ participants });
      await conversation.save();
    }
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({
      participants: userId
    }).populate('participants', 'name email');
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

