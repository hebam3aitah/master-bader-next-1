 const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  problemType: { type: String },
  description: { type: String },
  location: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [{ type: String }],
  reportedAt: { type: Date, default: Date.now },
  severityLevel: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  reporterName: { type: String, required: true },
  phone: { type: String, required: true },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reviewedByAdmin: {
    type: Boolean,
    default: false,
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}, { timestamps: true });

module.exports = mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
