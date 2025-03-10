

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // New: friend list
});

module.exports = mongoose.model('User', UserSchema);
