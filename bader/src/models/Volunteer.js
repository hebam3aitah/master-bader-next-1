const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },  // Description of the task
  experience: { type: String },  // Required experience for certain tasks
  issueAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
