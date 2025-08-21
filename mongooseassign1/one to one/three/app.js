import  express from "express"
import mongoose from "mongoose"

import Patient from "./models/patient.js";
import Medical from "./models/medical.js";

const app=express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/medi').then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Database not connected");
})

app.post('/patients', async (req, res) => {
  try {
    const p = new Patient(req.body);
    const p1 = await p.save();
    res.status(201).json(p1);
  } catch (err) {
    res.status(500).send("error h bhaiya");
  }
});

app.post('/medicals',async(req,res)=>{
    try{
        const m=new Medical(req.body);
        const m1=await m.save();
        res.status(201).json(m1);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhaiya");
    }
})

app.get('/patients',async(req,res)=>{
    try{
        const p=await Patient.find().populate('medical');
        res.json(p);
    }
    catch(err){
        res.status(500).send("error h bhai")
    }
})

app.get('/medicals',async(req,res)=>{
    try{
        const m=await Medical.find().populate('patient');
        res.json(m);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhai")
    }
})

app.put('/patients/:id',async(req,res)=>{
    try{
        const p=await Patient.findByIdAndUpdate(req.params.id,res.body,{new :true});
        if(!p){
            res.status(404).send("patient not found");
        }
        res.status(200).send(p);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhai")
    }
})

app.put('/medicals/:id',async(req,res)=>{
    try{
        const m=await Medical.findByIdAndUpdate(req.params.id,res.body,{new :true});
        if(!m){
            res.status(404).send("medical not found");
        }
        res.status(200).send(m);
    }
    catch(err){
        console.log(err);
        res.status(500).send("error h bhai")
    }
})

app.delete('/patients/:id',async(req,res)=>{
    try
    {
        const p=await Patient.deleteOne({_id:req.params.id});
        if(!p){
            res.status(404).send("patient to chahiye bhaiya")
        }
        res.status(200).send("deleted successfully");
    }
    catch(err){
        res.status(500).send("error h bhiya")
    }
})

app.delete("/medicals/:id",async(req,res)=>{
    try{
        const m=await Medical.deleteOne({_id:req.params.id});
        if(!m){
            res.status(404).send("medical to chahiye bhaiya");
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