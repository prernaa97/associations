import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import Profile from "./models/profile.js";


const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/onetoone").then(()=>{
    console.log("Database connected");
}).catch(()=>{
    console.log("Some error is there in connection");
});

app.post("/user",async(req,res)=>{
    try{
   const user=new User(req.body);
       const user1=await user.save();
       res.json(user1);
    }catch(err){
        res.status(400).send(err)
    }
})

app.post("/profile",async(req,res)=>{
    try{
     const pro=new Profile(req.body);
     const pro1=await pro.save(); 
     res.json(pro1);
    }catch(err){
        res.status(400).send("error is there")
    }
});
app.get("/profile",async(req,res)=>{
    try{
       const pro=await Profile.find().populate("user");
       res.json(pro);
    }catch(err){
        res.status(400).send("Error is there");
    }
});

app.get("/user",async(req,res)=>{
    try{
       const user=await User.find().populate('profile');
       res.json(user);
    }catch(err){
        res.status(400).send("Error is there");
    }
})



app.listen(3000,()=>{
    console.log("Server Started");
})




