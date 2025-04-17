const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  Title: { type: String },
  Description: { type: String },
  Location: { type: String },
  Category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  Images: [{ type: String }],
  ReportedAt: { type: Date, default: Date.now },
  DangerLvl: { type: String, enum: ['urgent', 'medium', 'low'], default: 'low' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // ⬅️ عدّل بدل Number

  // User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// ✅ منع إعادة تعريف النموذج في بيئة Next.js
module.exports = mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
