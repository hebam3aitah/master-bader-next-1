const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['status-update', 'donation', 'volunteer-application'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
