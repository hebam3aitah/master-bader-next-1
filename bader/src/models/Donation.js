const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  donatedAt: { type: Date, default: Date.now },
  issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
});

module.exports = mongoose.model('Donation', donationSchema);
