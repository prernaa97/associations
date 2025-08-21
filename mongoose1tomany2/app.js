import express from "express";
import mongoose from "mongoose";
import Employee from "./models/employee.js";
import Project from "./models/project.js";


const app=express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/onetomany").then(()=>{
    console.log("Database connected")
}).catch(()=>{
    console.log("Some error is there in connection");
});

app.post("/projects",async(req,res)=>{
    try{
    const pro=new Project (req.body);
    const pro1= await pro.save();
    res.json(pro1);
    }catch(err){
        res.status(400).send("Error is there")
    }
});

app.post("/emp",async(req,res)=>{
    try{
      const emp=new Employee(req.body);
      const emp1=await emp.save();
      res.json(emp1);
    }catch(err){
        console.log(err);
        
     res.status(400).send("Error is there");
    }
});

app.get("/emp",async(req,res)=>{
    try{
       const emp=await Employee.find().populate("project");
       res.json(emp)
    }catch(err){
        res.status(400).send("Error is there");
    }
});

app.get("/pro",async(req,res)=>{
    try{
       const pro=await Project.find().populate("employees");
       res.json(pro)
    }catch(err){
        res.status(400).send("Error is there");
    }
});


app.listen(3000,()=>{
    console.log("server started");
})