import mongoose from "mongoose";
import Patient from "./patient.js";

const medicalSchema=new mongoose.Schema({
    bloodGroup:String,
    allergies:String,
    diagnosis:String,
    prescription:String,
    patient:{type:mongoose.Schema.Types.ObjectId,ref:'Patient'}
},{
    timestamps:false
})

const Medical=mongoose.model('Medical',medicalSchema);

export default Medical;