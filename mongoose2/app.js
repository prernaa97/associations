import express from "express";
import mongoose from "mongoose";
import Student from "./models/student.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userdemo")
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Some error is there in connection"));

app.post("/students", async (req, res) => {
  try {
    const stu = new Student(req.body);
    const stu1 = await stu.save();
    res.json(stu1);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error saving student");
  }
});

app.get("/students",async(req,res)=>{
 try{
 const students=await Student.find();
 res.json(students);
 }catch(err){
        res.status(400).send("Some error is there")
    }
});

app.get("/students/marks/above60", async (req, res) => {
  try {
    const students = await Student.find({marks:{$gt:60}})
    res.json(students);
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
});

app.get("/students/failed", async (req, res) => {
  try {
    const failedStudents = await Student.find({isPassed:false})
    res.json(failedStudents);
  } catch (err) {
    res.status(500).send("Error fetching failed students");
  }
});
app.put("/students/update-marks/:rollNumber", async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { rollNumber: req.params.rollNumber },
      { marks: req.body.marks },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Error updating marks");
  }
});
app.put("/students/update-grade/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) return res.status(404).send("Student not found");

    let grade = "D";
    if (student.marks > 90) grade = "A";
    else if (student.marks > 75) grade = "B";
    else if (student.marks > 60) grade = "C";

    student.grade = grade;
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).send("Error updating grade");
  }
});

app.delete("/students/failed",async(req,res)=>{
    try{
        const stu=await Student.deleteMany({isPassed:false});
        if (stu.deletedCount === 0) {
            return res.status(404).send("No failed students to delete");
        }
        res.status(200).send("Deleted Successfully")
        
    }catch(err){
        res.status(400).send("error is there");

    }
})

app.delete("/students/:rollNumber", async (req, res) => {
  try {
    const result = await Student.deleteOne({ rollNumber: req.params.rollNumber });
    if (result.deletedCount === 0) {
      return res.status(404).send("Student not found");
    }
    res.send("Student deleted");
  } catch (err) {
    res.status(500).send("Error deleting student");
  }
});





app.listen(3000, () => {
  console.log("Server started on port 3000");
});
