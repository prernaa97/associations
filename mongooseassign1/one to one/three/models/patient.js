import mongoose from "mongoose";

const patientSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    gender:String,
    admissionDate:Date,
    medical:{type:mongoose.Schema.Types.ObjectId,ref:'Medical'}
},{
    timestamps:false
})

const Patient=mongoose.model("Patient",patientSchema);

export default Patient;
