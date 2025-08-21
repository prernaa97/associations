// models/course.model.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  }
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
