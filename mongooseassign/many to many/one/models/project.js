import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  deadline: Date,
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
