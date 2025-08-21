import sequelize from "./db.js";
import express from 'express';
import Employee from "./models2/employee.js";
import EmployeeProject from "./models2/employeeproject.js";
import Project from "./models2/project.js";

import empRouter from "./routes2/employee.js";
import proRouter from "./routes2/project.js";
import emproRouter from "./routes2/employeeproject.js";
  
const app=express();
app.use(express.json());

Employee.belongsToMany(Project,{through:EmployeeProject,foreignKey:'empId'})
Project.belongsToMany(Employee,{through:EmployeeProject,foreignKey:'proId'})

sequelize.sync({force:false}).then(()=>{
    console.log("DB Synced");
});

app.use('/employees',empRouter);
app.use('/projects',proRouter);
app.use("/", emproRouter);


app.listen(3000,()=>{
    console.log("Server started");
});