import { Router } from "express";
import Department from "../models2/department.js";
import Employee from "../models2/employee.js";
import { Op } from "sequelize";


const router = Router();

router.get('/search/location', async (req, res) => {             //getting departs by their location
    try {
        const {location} = req.query;

        if (!location) {
            return res.status(400).send("Please provide a location to search");
        }

        const departments = await Department.findAll({
            where: {
                location: {
                    [Op.like]: `%${location}%`
                }
            },
            include:Employee                      //optional
        });

        if (departments.length === 0) {
            return res.status(404).send("No departments found for that location");
        }

        res.json(departments);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error searching departments by location");
    }
});

router.post('/',async(req,res)=>{                         //creating department 
    console.log(req.body);
    const {dname,location}= req.body;
    if(!dname)
        {
        return res.status(400).send("Department name is must");
    }
    if(!location)
    {
       return res.status(400).send("Location is must");
    }
    try{
       const depart = await Department.create({ dname, location}); 
    res.status(201).json({ message: "Department created", depart });
    }
    catch(err)
    {
        res.send(err);
    }
});


router.post ('/:id/employees',async(req,res)=>{  //mapping emlopyees with departs       there are two ways first
                                             //  one is this url like provide did while creating employee
// and other is first you create an employee and then assign department to that employee      in employee.js
    try{
        const depart=await Department.findByPk(req.params.id);
        if(!depart){
           return res.status(404).send("Department not found")
        }
        const emp=await Employee.create({ename:req.body.ename,email:req.body.email,position:req.body.position,did:req.params.id});
        res.status(201).send("employee added with department")
    }
    catch(err){
       return res.status(500).send("error is there");
    }
});

router.get('/',async(req,res)=>{             //List of all departments with their employees
    try{
        const departs=await Department.findAll({include:Employee});
        res.json(departs)
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});

router.get('/:id',async(req,res)=>{         //get particular department
    try{
        const depart=await Department.findByPk(req.params.id,{include:Employee});
        res.json(depart)
    }
    catch(err){
        return res.status(500).send("Some error is there!!");
    }
});

router.put('/:id',async(req,res)=>{      //updating department by ids  
    try{
        const depart=await Department.findByPk(req.params.id);
        const {dname,location}=req.body;
        if(dname){
            depart.dname=dname;
        }
        if(location){
            depart.location=location;
        }
        await depart.save();
        res.json("Department updated")
    }catch(err){
        return res.status(500).send("Some error is there");
    }
}); 
router.delete('/:id',async(req,res)=>{       //Deleting departments by ids BY DEFAULT, including employees
    try{
        const depart=await Department.findByPk(req.params.id);
        if(!depart){
            res.status(500).send("Department not found");
        }
        await depart.destroy();
        res.send("Department deleted!!")
    }catch(err){
        return res.status(404).send("Some error is there!!")
    }
});
router.get('/:id/employees',async(req,res)=>{   //getting emps by their department ids
    try{
        const depart=await Department.findByPk(req.params.id,{include:Employee});
        if(!depart){
            return res.status(404).send("Department not found");
        }
       // res.json(depart.employees);
        res.json({department: depart.dname,  //optional
                 location: depart.location,  //optional
                 employees: depart.employees});//depart.employees is also fine will provide list of associated emps
    }catch(err){
        return res.status(500).send("error in fetching the employees");
    }
});









export default router;

