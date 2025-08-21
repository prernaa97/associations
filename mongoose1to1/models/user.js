import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    
    
},{
    timestamps:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

userSchema.virtual("profile",{
    ref:"Profile",
    localField:"_id",
    foreignField:"user"
});

const User=mongoose.model("user",userSchema);
export default User;