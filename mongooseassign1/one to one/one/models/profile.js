import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:false
})

const Profile=mongoose.model("Profile",profileSchema);

export default Profile;