import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: String,
  type: String, // video or pdf
  fileUrl: String
}, { timestamps: true });

export default mongoose.model("Content", contentSchema);