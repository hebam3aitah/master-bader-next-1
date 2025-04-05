import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "volunteer"], default: "user" }, // تحديد دور المستخدم
  profilePicture: { type: String, default: "" }, // صورة المستخدم
  createdAt: { type: Date, default: Date.now },
  verificationToken: String,
  verificationTokenExpires: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
