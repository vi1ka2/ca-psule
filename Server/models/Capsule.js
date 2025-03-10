// server/models/Capsule.js
const mongoose = require('mongoose');

const CapsuleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  media: { type: String },
  deliverAt: { type: Date, required: true },
  delivered: { type: Boolean, default: false },
  recipientPhone: { type: String, required: true }
});

module.exports = mongoose.model('Capsule', CapsuleSchema);

