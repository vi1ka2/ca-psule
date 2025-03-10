// server/routes/capsules.js
const express = require('express');
const router = express.Router();
const capsuleController = require('../controllers/capsuleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, capsuleController.createCapsule);
router.get('/', authMiddleware, capsuleController.getCapsules);

module.exports = router;

