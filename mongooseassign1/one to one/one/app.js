import express from 'express'
import mongoose from 'mongoose'

import User from './models/user.js'
import Profile from './models/profile.js'


const app=express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/oneuser').then(()=>{
    console.log("Database connected");
}).catch(()=>{
    console.log("Database is not connected");
})

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    const user1 = await user.save();
    res.json(user1);
})

app.post('/profiles', async (req, res) => {
    const profile = new Profile(req.body);
    const profile1 = await profile.save();
    res.json(profile1);
});

app.get("/users", async (req, res) => {
    const users = await User.find().populate('profile'); 
    res.json(users);
});

app.get("/profiles", async (req, res) => {
    const profile = await Profile.find().populate('user');
    res.json(profile);
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/profiles/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) {
      return res.status(404).send("Profile not found");
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.delete("/profiles/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).send("Profile not found");
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})