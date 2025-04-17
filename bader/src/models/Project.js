const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  // issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },  // ربط المشروع بالمشكلة
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['urgent', 'medium', 'low'], default: 'medium' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // المستخدمين الذين قاموا بالإعجاب
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }, // ⬅️ هذا ضروري

  shareCount: { type: Number, default: 0 },  // عدد المشاركات على وسائل التواصل الاجتماعي
  reportedAt: { type: Date, default: Date.now },  // تاريخ بدء المشروع بعد الموافقة
});

module.exports = mongoose.model('Project', projectSchema);
