import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    profile:{type:mongoose.Schema.Types.ObjectId,ref:'Profile'}
},{
    timestamps:false
})

const User=mongoose.model("User",userSchema);

export default User;
