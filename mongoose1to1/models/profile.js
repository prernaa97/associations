import mongoose from "mongoose";

const proSchema=new mongoose.Schema({
    bio:{type:String},
    age:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"}


},{
    timestamps:false
});

const Profile=mongoose.model("Profile",proSchema);
export default Profile;