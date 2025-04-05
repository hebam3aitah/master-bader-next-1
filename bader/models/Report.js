import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "in-progress", "closed"], default: "open" },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
