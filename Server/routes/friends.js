const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/request', authMiddleware, friendController.sendFriendRequest);
router.get('/requests', authMiddleware, friendController.getFriendRequests);
router.post('/accept', authMiddleware, friendController.acceptFriendRequest);
router.post('/reject', authMiddleware, friendController.rejectFriendRequest);
router.get('/friends', authMiddleware, friendController.getFriendsList);

module.exports = router;
