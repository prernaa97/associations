import  express from "express"
import mongoose from "mongoose"

import Employee from "./models/employee.js"
import IdCard from "./models/idcard.js"


const app=express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/emp').then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Database not connected");
})

app.post('/emps',async(req,res)=>{
    try{
        const emp=new Employee(req.body);
        const emp1=await emp.save();
        res.status(201).json(emp1);
    }
    catch(err){
        res.status(500).send("error h bhaiya");
    }
})

app.post('/idcards',async(req,res)=>{
    try{
        const id=new IdCard(req.body);
        const id1=await id.save();
        res.status(201).json(id1);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhaiya");
    }
})

app.get('/emps',async(req,res)=>{
    try{
        const emp=await Employee.find().populate('idcard');
        res.json(emp);
    }
    catch(err){
        res.status(500).send("error h bhai")
    }
})

app.get('/idcards',async(req,res)=>{
    try{
        const id=await IdCard.find().populate('employee');
        res.json(id);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhai")
    }
})

app.put('/emps/:id',async(req,res)=>{
    try{
        const emp=await Employee.findByIdAndUpdate(req.params.id,res.body,{new :true});
        if(!emp){
            res.status(404).send("Employee not found");
        }
        res.status(200).send(emp);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhai")
    }
})

app.put('/idcards/:id',async(req,res)=>{
    try{
        const id=await IdCard.findByIdAndUpdate(req.params.id,res.body,{new :true});
        if(!id){
            res.status(404).send("Idcard not found");
        }
        res.status(200).send(id);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhai")
    }
})

app.delete('/emps/:id',async(req,res)=>{
    try
    {
        const emp=await Employee.deleteOne({_id:req.params.id});
        if(!emp){
            res.status(404).send("employee to chahiye bhaiya")
        }
        res.status(200).send("deleted successfully");
    }
    catch(err){
        res.status(500).send("error h bhiya")
    }
})

app.delete("/idcards/:id",async(req,res)=>{
    try{
        const id=await IdCard.deleteOne({_id:req.params.id});
        if(!id){
            res.status(404).send("idcard to chahiye bhaiya");
        }
        res.status(200).send("deleted successfully")
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhaiya")
    }
})


app.listen(3000,()=>{
    console.log("Server Started on port 3000");
})