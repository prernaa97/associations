// routes/course.routes.js
import express from "express";
import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";

const router = express.Router();

// Create course for a teacher
router.post("/", async (req, res) => {
  try {
    const { title,description, teacherId } = req.body;
    const course = await Course.create({ title,description, teacher: teacherId });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacher");
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/sort", async (req, res) => {
  try {
    const courses = await Course.find().sort({ title: 1 }); // 1 = ASC, -1 = DESC
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete course
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses by a teacher
router.get("/by-teacher/:teacherId", async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.params.teacherId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
