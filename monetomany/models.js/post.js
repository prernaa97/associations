import mongoose, { mongo } from "mongoose";

const postSchema=new mongoose.Schema({
    title:String,
    content:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"}  //act as fk which connects user to post
},{
    timestamps:false
});

const Post=mongoose.model("post",postSchema);
export default Post;