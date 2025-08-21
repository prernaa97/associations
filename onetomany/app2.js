import sequelize from "./db.js";
import express from 'express';
import Employee from "./models2/employee.js";
import Department from "./models2/department.js";

import departRouter from "./routes2/department.js";
import empRouter from "./routes2/employee.js";

const app=express();
app.use(express.json());

Department.hasMany(Employee,{foreignKey:"did",onDelete:'CASCADE'});
Employee.belongsTo(Department,{foreignKey:"did",onDelete:'CASCADE'});

sequelize.sync({force:false}).then(()=>{
    console.log("DB Synced");
});

app.use('/departments',departRouter);
app.use('/employees',empRouter);






app.listen(4000,()=>{
    console.log("Server started");
});


