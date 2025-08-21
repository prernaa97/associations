import express from "express";
import sequelize from "./DB.js";
import Employee from "./models/employee.js";
import IdCard from "./models/IdCard.js";

const app = express();
app.use(express.json());


Employee.hasOne(IdCard, { foreignKey: 'emId', onDelete: 'CASCADE' });
IdCard.belongsTo(Employee, { foreignKey: 'emId', onDelete: 'CASCADE' });

sequelize.sync({ force: false }).then(() => {
    console.log("Db IS Connected!")
});

// employee added
app.post('/addEmployee', async (req, res) => {
    console.log("Employee Data Are  :-", req.body);
    const { empname, empemail, empdesignation, empjoinDate, idCard } = req.body;

    try {
        const employee = await Employee.create(
            {
                empname,
                empemail,
                empdesignation,
                empjoinDate,
                IdCard: idCard //  associate properly
            },
            {
                include: [IdCard]
            }
        );

        res.status(201).json({ message: 'Employee is ADDED', employee });
    } catch (err) {
        res.status(500).send("Error is There!")
    }
})

// employee by id
app.get('/byId/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, { include: IdCard });
        if (!employee) {
            res.status(404).send("Employee Not Found!")
        }
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).send("Server Error !");
    }
})

// employee Update
app.put('/updateEmployee/:id', async (req, res) => {
    console.log(req.body);
    const { empname, empemail, empdesignation, empjoinDate, idCard } = req.body;

    try {
        const employee = await Employee.findByPk(req.params.id, { include: IdCard });

        if (!employee) {
            return res.status(404).send("Employee Not Found!");
        }

        if (empname) {
            employee.empname = empname;
            await employee.save();
        }

        if (empemail) {
            employee.empemail = empemail;
            await employee.save();
        }

        if (empdesignation) {
            employee.empdesignation = empdesignation;
            await employee.save();
        }

        if (empjoinDate) {
            employee.empjoinDate = empjoinDate;
            await employee.save();
        }

        if (idCard && employee.IdCard) {
            if (idCard.cardNumber) {
                employee.IdCard.cardNumber = idCard.cardNumber;
            }
            if (idCard.issueDate) {
                employee.IdCard.issueDate = idCard.issueDate;
            }
            if (idCard.expiryDate) {
                employee.IdCard.expiryDate = idCard.expiryDate;
            }
            await employee.IdCard.save();
        }

        res.status(201).send(employee);

    } catch (err) {
        console.error("Error during update:", err); 
        res.status(500).send("Server Error !");
    }
});

// delete employee
app.delete('/deleteEmployee/:id', async(req,res)=>{
    try{
        const employee =  await Employee.findByPk(req.params.id,{include: IdCard});
        if(!employee){
            res.status(404).send("Employee Not Found!");
        }
        await employee.destroy();
        res.status(201).send("Employee Deleted SuccesFully!");
    }catch(err){
        res.status(500).send("Server Error!");
    }
})
app.listen(3000, () => {
    console.log("Employee HomeWork");
})