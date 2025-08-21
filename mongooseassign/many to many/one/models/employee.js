import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
