import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: Number, required: true, unique: true },
  marks: { type: Number, required: true },
  grade: { type: String, required: true },
  isPassed: { type: Boolean, required: true }
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
