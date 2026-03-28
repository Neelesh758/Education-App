import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register student
router.post("/register", async (req, res) => {
  const { name, rollNumber, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    rollNumber,
    password: hashed,
    role: "student"
  });

  await user.save();

  res.json("Student registered");
});

// Teacher creation (manual)
router.post("/create-teacher", async (req, res) => {
  const { name, rollNumber, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const teacher = new User({
    name,
    rollNumber,
    password: hashed,
    role: "teacher"
  });

  await teacher.save();

  res.json("Teacher created");
});

// Login
router.post("/login", async (req, res) => {
  const { rollNumber, password } = req.body;

  const user = await User.findOne({ rollNumber });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret"
  );

  res.json({ token, role: user.role });
});

export default router;