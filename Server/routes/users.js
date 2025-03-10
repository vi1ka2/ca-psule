const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users/search?query=someString
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json([]);
    }

    // Simple search by name or email
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive
    const users = await User.find({
      $or: [{ name: regex }, { email: regex }]
    }).select('name email'); // Only return basic fields

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
