const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  Title: { type: String }, // ممكن تخليه "problemType" بدلًا من "Title" لو بتحب الوضوح
  Description: { type: String },
  Location: { type: String },
  Category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // إذا رح تستخدم تصنيفات جاهزة
  Images: [{ type: String }],
  ReportedAt: { type: Date, default: Date.now },
  DangerLvl: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }, // ✅ حدث enum
  reporterName: { type: String, required: true }, // ⬅️ جديد
  phone: { type: String, required: true },        // ⬅️ جديد
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending',
  }, // ⬅️ لحالة البلاغ
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // إذا تم ربطه بمشروع
});

module.exports = mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
