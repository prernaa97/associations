import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:String
},{
    timestamps:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});                            
 //user me post physically exist nhi krta  
  //post me user haii through populate   

userSchema.virtual("posts",{
    ref:"post",
    localField:"_id",
    foreignField:"user"
})

const User=mongoose.model("user",userSchema);
export default User; 