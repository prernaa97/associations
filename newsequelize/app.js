import express from 'express'
import sequelize from './db.js';

import student from './models/student.js';

const app=express();
app.use(express.json());

sequelize.authenticate().then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Databse Not Connected")
});

sequelize.sync().then(()=>{
 console.log("DB Synced")
});

app.post('/addstudent',async (req,res)=>{                   //Add a new student
    const std=await student.create(req.body);
    res.send("Student Added");
    //res.json(std)
});

app.get('/students',async(req,res)=>{
    const stds=await student.findAll(req.body);            //List of all students
    res.json(stds);
})

app.get('/students/:id',async(req,res)=>{
    const std=await student.findByPk(req.params.id);          //get by id
    if(std){
       // console.log("data aaya ki noii?");
        res.status(200).json(std);
    }   else{
        res.status(404).send("Student not found");
    }  
});

app.put ('/students/:id', async(req,res)=>{                             //updating by id
    const std=await student.findByPk(req.params.id);
    if(std){
        await std.update(req.body);                                    //std.update() !!(right)
        res.json(std)
    }else{
        res.status(404).send("Student not found");
    }  
});


// app.put('/students/:id', async(req,res)=>{
//     const id =req.params.id;
//     const std=await student.findByPk(id);                         //updating by id
//     if (std) {
//       await student.update(req.body, { where: { id } });         //if we write student here then we to provide the where clause too

//       const updatedStudent = await student.findByPk(id);  
//      // res.status(200).send("DATA updated successfully")            // Refetch updated data
//       res.json(updatedStudent);
//     } else {
//       res.status(404).send("Student not found");
//     }
// });

app.delete('/students/:id',async(req,res)=>{
    const std=await student.findByPk(req.params.id);
    if(std){
        await std.destroy();                                           
        res.send("Data Deleted Successfully");
    }else{
        res.status(404).send("Student not found");
    }
});



app.listen(8000,()=>{
    console.log("Server Started");;
})

