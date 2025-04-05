const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  location: { type: String },
  totalDonations: { type: Number, default: 0 },
});

module.exports = mongoose.model('Organization', organizationSchema);
