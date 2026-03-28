import express from "express";
import multer from "multer";
import Content from "../models/content.model.js";
import { protect, isTeacher } from "../middleware/auth.middleware.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload (Teacher only)
router.post("/upload", protect, isTeacher, upload.single("file"), async (req, res) => {
  const { title, type } = req.body;

  const newContent = new Content({
    title,
    type,
    fileUrl: `/uploads/${req.file.filename}`
  });

  await newContent.save();

  res.json("Uploaded successfully");
});

// Get all content (students)
router.get("/", protect, async (req, res) => {
  const data = await Content.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;