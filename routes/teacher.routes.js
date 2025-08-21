// routes/teacher.routes.js
import express from "express";
import Teacher from "../models/teacher.model.js";
import Profile from "../models/profile.model.js";
import Course from "../models/course.model.js";

const router = express.Router();

// Create Teacher
router.post("/teachers", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("profile").populate("courses") ;
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Teacher by ID
router.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("profile").populate("courses");
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Teacher
router.put("/teachers/:id", async (req, res) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Teacher not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Teacher
router.delete("/teachers/:id", async (req, res) => {
  try {
    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Teacher not found" });
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign Profile to Teacher (One-to-One)
router.post("/teachers/:id/profile", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { profile: profile._id },
      { new: true }
    );
    res.json({ teacher, profile });      
  } catch (err) {
    res.status(400).json({ error: err.message });  
  }
});

//better wayy   //profilee//

// Assign Profile to Teacher (One-to-One)
router.post("/teachers/:id/profilee", async (req, res) => {
  try {
    // Step 1: Get teacher
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Step 2: Check if profile already assigned
    if (teacher.profile) {
      return res.status(400).json({ error: "Profile already assigned to this teacher" });
    }

    // Step 3: Create profile and assign
    const profile = await Profile.create(req.body);
    teacher.profile = profile._id;
    await teacher.save();

    res.json({ teacher, profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assign Course to Teacher (One-to-Many)
router.post("/teachers/:id/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    const teacher = await Teacher.findById(req.params.id);
    teacher.courses.push(course._id);
    await teacher.save();
    res.json({ teacher, course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
  
//better wayy             //course hai courses nhi
// Assign Course to Teacher (One-to-Many)
router.post("/teachers/:id/course", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    // 1. Find course by name (jo user ne diya)
    let course = await Course.findOne({ name: req.body.name });

    // 2. Agar course nahi mila to naya banao
    if (!course) {
      course = await Course.create(req.body);
    }

    // 3. Check if already assigned
    if (teacher.courses.includes(course._id)) {
      return res.status(400).json({ error: "Course already assigned to this teacher" });
    }

    // 4. Assign course
    teacher.courses.push(course._id);
    await teacher.save();

    res.json({ teacher, course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get Teachers by Course ID
router.get("/teachers/by-course/:courseId", async (req, res) => {
  try {
    const teachers = await Teacher.find({ courses: req.params.courseId }).populate("courses");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
