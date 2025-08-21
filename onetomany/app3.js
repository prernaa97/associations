import sequelize from "./db.js";
import express from 'express';
import Teacher from "./models3/teacher.js";
import Class from "./models3/classes.js";

import teacherRouter from "./routes3/teacher.js";
import classRouter from "./routes3/classes.js";

const app=express();
app.use(express.json());

Teacher.hasMany(Class,{foreignKey:"tid",onDelete:'CASCADE'});
Class.belongsTo(Teacher,{foreignKey:"tid",onDelete:'CASCADE'});

sequelize.sync({force:true}).then(()=>{
    console.log("DB Synced");
});

app.use('/teachers',teacherRouter);
app.use('/classes',classRouter);






app.listen(3000,()=>{
    console.log("Server started");
});