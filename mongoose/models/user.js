import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,default:18}
},
{
    timestamps: false
});

const User=mongoose.model("User",userSchema);
export default User;