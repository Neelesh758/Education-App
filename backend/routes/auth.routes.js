import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect, isTeacher } from "../middleware/auth.middleware.js";

const router = express.Router();


// ✅ Register Student (Only Teacher)
router.post("/register", protect, isTeacher, async (req, res) => {
  try {
    const { name, rollNumber, password } = req.body;

    const existingUser = await User.findOne({ rollNumber });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      rollNumber,
      password: hashed,
      role: "student",
    });

    await user.save();

    res.json("Student registered successfully ✅");
  } catch (err) {
    res.status(500).json("Server error");
  }
});


// ✅ Create Teacher (Only Teacher)
router.post("/create-teacher", protect, isTeacher, async (req, res) => {
  try {
    const { name, rollNumber, password } = req.body;

    const existingUser = await User.findOne({ rollNumber });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const teacher = new User({
      name,
      rollNumber,
      password: hashed,
      role: "teacher",
    });

    await teacher.save();

    res.json("Teacher created successfully ✅");
  } catch (err) {
    res.status(500).json("Server error");
  }
});


// ✅ Login (Public)
router.post("/login", async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    const user = await User.findOne({ rollNumber });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret"
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json("Server error");
  }
});

export default router;
