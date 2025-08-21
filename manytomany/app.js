import express from 'express'
import sequelize from './db.js';
import Student from './models/student.js';
import Course from './models/course.js';
import StudentCourse from './models/studentcourse.js';

const app=express();

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
Student.belongsToMany(Course,{through:StudentCourse,foreignKey:'studentId'})
Course.belongsToMany(Student,{through:StudentCourse,foreignKey:'courseId'})


sequelize.sync({force:false}).then(()=>{   //whenever we make any changes in the constraints then we have to set force as true then after creating make it false
    console.log("databased synced")
}).catch((err)=>{
    console.error("Error syncing database",err);
});

app.post('/students',async(req,res)=>{
    try{
        const student=await Student.create(req.body);
        res.status(201).json(student);
    }catch(err){
        res.send("error");
    }
});

app.post('/course',async(req,res)=>{
    try{
        const course=await Course.create(req.body);
        res.status(201).json(course);
    }catch(err){
        res.send("error");
    }
});
app.post('/student/:id/enroll',async(req,res)=>{
    try{
        const student=await Student.findByPk(req.params.id);
        const {courseIds}=req.body;
        if(!student)
            res.status(404).send("not found");

        const courses=await Course.findAll({where:{cid:courseIds}})

        await student.addCourses(courses);
        res.json("student enrolled")

    }catch(err){
         res.send("Error is there")
    }
});
app.get('/student/:id',async (req,res)=>{
    try{
        const student=await Student.findByPk(req.params.id,{include:Course});
        if(!student)
            res.send("not found");

        res.json(student)
    }catch(err){
      res.send("not found");
    }
});

app.get('/course/:id',async (req,res)=>{
    try{
        const course=await Course.findByPk(req.params.id,{include:Student});
        if(!course)
            res.send("not found");

        res.json(course)
    }catch(err){
      res.send("not found");
    }
});


app.delete("/student/:sid/course/:cid",async(req,res)=>{
    const student =await Student.findByPk(req.params.sid);

    if(!student)
        return res.json("not found");

    await student.removeCourse(req.params.cid);
    res.json("Course removed from student")
});

app.delete('/student/:sid/course',async(req,res)=>{
    const student =await Student.findByPk(req.params.sid);
    if(!student)
      return  res.json("not found");

    await student.setCourses([]);
    res.json("all courses removed from student")
});


app.listen(3000,()=>{
    console.log("server started");
});