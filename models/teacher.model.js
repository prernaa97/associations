// models/teacher.model.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
