import mongoose from "mongoose";

const empSchema=new mongoose.Schema({
    name:{ type:String,required:true},
    email:{ type:String,required:true},
    position:{ type:String,required:true},
    project:{type:mongoose.Schema.Types.ObjectId,ref:"project"}
},{
    timestamps:false
});

const Employee =mongoose.model("Employee",empSchema);
export default Employee;