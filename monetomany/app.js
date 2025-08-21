import express from "express";
import mongoose from "mongoose";
import User from "./models.js/user.js";
import Post from "./models.js/post.js";


const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/onetomany").then(()=>{
    console.log("Database connected")
}).catch(()=>{
    console.log("Some error is there in connection");
});

app.post("/users",async(req,res)=>{
    try{
       const user=new User(req.body);
       const user1=await user.save();
       res.json(user1);
    }
    catch(err){
     res.status(400).send("Error is there")
    }
})


app.post("/posts",async(req,res)=>{
    try{
       const post=new Post(req.body);
       const post1=await post.save();
       res.json(post1);
    }
    catch(err){
     res.status(400).send("Error is there")
    }
})

app.get("/posts",async(req,res)=>{
    try{
    const post= await Post.find().populate("user");  //acts as include
    res.json(post);
    }catch(err){
     res.status(400).send("Error is there");
    }
})

app.get("/users",async(req,res)=>{
    try{
    const user= await User.find().populate("posts");  //  populate will not work here
    res.json(user);
    }catch(err){
     res.status(400).send("Error is there")
    }
});


app.listen(3000,()=>{
    console.log("Server started")
})