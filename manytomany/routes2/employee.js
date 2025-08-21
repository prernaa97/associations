import { Router } from "express";
import Employee from "../models2/employee.js";
import Project from "../models2/project.js";
import EmployeeProject from "../models2/employeeproject.js";

const router=Router();

router.post('/',async(req,res)=>{
    try{
const { ename, email, position } = req.body;
if (!ename || !email ||!position) {
    return res.status(400).send("ename and email are required");
}
        const emp=await Employee.create(req.body);
        res.status(201).json(emp);
    }catch(err){
        res.send("error");
    }
});




router.get('/',async (req,res)=>{
    try{
        const emps=await Employee.findAll({include:Project});
        if(!emps)
            res.status(404).send("not found");

        res.json(emps)
    }catch(err){
      res.status(404).send("error");
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const emp=await Employee.findByPk(req.params.id,{include:Project});
        if(!emp)
            res.send("not found");

        res.json(emp)
    }catch(err){
      res.status(404).send("error");
    }
});

router.get("/:eid/projects", async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.eid, {
            include: Project
        });

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.json(employee.projects);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to retrieve employee's projects");
    }
});

//if (!pname || typeof pname !== "string") return res.status(400).send("Invalid pname");


router.put('/:id',async(req,res)=>{                //Updating employees
    try{
        const emp=await Employee.findByPk(req.params.id);
        if(!emp){
            return res.status(404).send("Employee not found");
        }
        const{ename,email,position}=req.body;
        
        if(ename){
            emp.ename=ename;
        }
        if(email){
            emp.email=email;
        }
        if(position){
            emp.position=position;
        }

        await emp.save();
        res.send("Employee Updated!!")
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const emp=await Employee.findByPk(req.params.id);
        if(!emp){
            return res.status(404).send(" not found!!")
        }
        await emp.destroy();
        res.send("Employee deleted!!")
    }catch(err){
        return res.status(500).send("Some error is there")
    }
});



export default router;
