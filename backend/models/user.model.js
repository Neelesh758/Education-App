import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student"
  }
});

export default mongoose.model("User", userSchema);