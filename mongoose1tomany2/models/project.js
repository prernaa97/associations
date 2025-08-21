import mongoose from "mongoose";

const proSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    deadline:{type:String,required:true}
    
},{
    timestamps:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

proSchema.virtual("employees",{
    ref:"Employee",                     
    localField:"_id",
    foreignField:"project"
});

const Project= mongoose.model("project",proSchema); 
export default Project;