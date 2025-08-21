import mongoose from "mongoose";

const  idcardSchema= new mongoose.Schema({
    cardNumber:String,
    issueDate:Date,
    expiryDate:Date,
    employee:{type:mongoose.Schema.Types.ObjectId,ref:"Employee"}
})

const IdCard=mongoose.model('IdCard',idcardSchema);

export default IdCard;