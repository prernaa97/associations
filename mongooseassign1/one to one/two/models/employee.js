import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    destination:String,
    joiningDate:Date,
    idcard:{type:mongoose.Schema.Types.ObjectId,ref:'IdCard'}
},
{
    timestamps:false
})

const Employee=mongoose.model("Employee",employeeSchema);

export default Employee;