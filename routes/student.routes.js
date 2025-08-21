// routes/student.routes.js
import express from "express";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

const router = express.Router();

// Create Student
router.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find().populate("enrolledCourses");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Student by ID
router.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("enrolledCourses");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Student
router.put("/students/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Student
router.delete("/students/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll a Student to a Course (Many-to-Many)
router.post("/students/:id/enroll", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const course = await Course.findById(req.body.courseId);

    if (!student || !course) return res.status(404).json({ error: "Student or Course not found" });

    if (!student.enrolledCourses.includes(course._id)) {
      student.enrolledCourses.push(course._id);
      await student.save();
    }

    res.json({ message: "Student enrolled in course" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Unenroll a Student from a Course
router.post("/students/:id/unenroll", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const courseId = req.body.courseId;

    if (!student) return res.status(404).json({ error: "Student not found" });

    student.enrolledCourses.pull(courseId);
    await student.save();

    res.json({ message: "Student unenrolled from course" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students enrolled in a specific course
router.get("/students/by-course/:courseId", async (req, res) => {
  try {
    const students = await Student.find({ enrolledCourses: req.params.courseId }).populate("enrolledCourses");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
