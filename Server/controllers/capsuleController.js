// server/controllers/capsuleController.js
const Capsule = require('../models/Capsule');

exports.createCapsule = async (req, res) => {
  try {
    const { message, media, deliverAt, recipientPhone } = req.body;
    const capsule = new Capsule({
      userId: req.user.id,
      message,
      media,
      deliverAt,
      recipientPhone
    });
    await capsule.save();
    res.json(capsule);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ userId: req.user.id });
    res.json(capsules);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

