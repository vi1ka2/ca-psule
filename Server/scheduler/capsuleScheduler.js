// server/scheduler/capsuleScheduler.js
const cron = require('node-cron');
const Message = require('../models/Message');

module.exports.start = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const scheduledMessages = await Message.find({
      isCapsule: true,
      delivered: false,
      deliverAt: { $lte: now }
    });
    scheduledMessages.forEach(async (msg) => {
      try {
        msg.delivered = true;
        await msg.save();
        console.log(`Delivered scheduled message ${msg._id}`);
        // Optionally, emit a socket event to notify clients.
      } catch (error) {
        console.error('Error delivering scheduled message:', error);
      }
    });
  });
};

