import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";

const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userdemo").then(()=>{
    console.log("Database Connection");
}).catch(()=>{
    console.log("Some error is there in connection");
});

// POST
app.post("/users",async(req,res)=>{
    try{
      
        const user=new User(req.body);
        const user1=await user.save();
        res.status(201).json(user1)
    }catch(err){
res.status(400).send("error is there");
    }
});
// GET

app.get("/users",async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);

    }catch(err){
        res.status(400).send("Error is there");
    }
});
// Get by ID
 app.get("/users/:id",async(req,res)=>{
    try{
        const user =await User.findById(req.params.id);
        if(!user)
            res.status(404).send("user not found");
        res.json(user);

    }catch(err){
        res.status(400).send("error is there"); 
    }
 });
app.get("/users/name/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });

    if (!user) return res.status(404).send("User not found");

    res.json(user);
  } catch (err) {
    res.status(400).send("An error occurred");
  }
});



// Update by Id
 app.put("/users/:id",async(req,res)=>{
    try{
        const update=await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.json(update);

       

        if(!update){
            res.status(404).send("not found")
        }
    }catch(err){
        res.status(400).send("error is there")

    }
 });
// Deleted by id 

 app.delete("/users/:id",async(req,res)=>{
    try{

        const user=await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted Successfully")
    }catch(err){
        res.status(400).send("error is there")

    }
 })


app.listen(3000,()=>{
    console.log("server started");
});