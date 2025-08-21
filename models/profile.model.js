// models/profile.model.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
    min: 18
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },                       
  address: {
    type: String,
    required: true
  }
});

const Profile = mongoose.model("Profile", profileSchema); 
export default Profile;
