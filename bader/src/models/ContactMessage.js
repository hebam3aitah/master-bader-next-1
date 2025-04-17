import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  phone: String,
  replied: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
