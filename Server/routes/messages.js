// server/routes/messages.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:conversationId', authMiddleware, messageController.getMessages);

module.exports = router;
