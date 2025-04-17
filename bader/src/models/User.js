import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // غير مطلوب لحسابات Google
  role: { type: String, enum: ["user", "admin", "volunteer"], default: "user" },

  // الصور: واحدة مخصصة للـ Google، والثانية لمن يسجل يدويًا
  image: { type: String }, // صورة من حساب Google
  profilePicture: { type: String, default: "" }, // يرفعها المستخدم يدويًا
  age: { type: Number },  // الحقل الجديد

  address: { type: String },
  profession: { type: String },
  experience: { type: String },
  birthDate: { type: Date },
  IsConfirmed: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
  otp: { type: String }, // رمز التحقق
});

export default mongoose.models.User || mongoose.model("User", userSchema);
