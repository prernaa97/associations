import { Router } from "express";
import Employee from "../models2/employee.js";
import Project from "../models2/project.js";
import EmployeeProject from "../models2/employeeproject.js";

const router=Router();

router.post('/',async(req,res)=>{
    try{
        const pro=await Project.create(req.body);
        res.status(201).json(pro);
    }catch(err){
        res.send("error");
    }
});

router.get('/',async (req,res)=>{
    try{
        const pros=await Project.findAll({include:Employee});
        if (!pros || pros.length === 0){
    return res.status(404).send("No projects found");
        }

        res.json(pros)
    }catch(err){
      res.send("not found");
    }
});

router.get('/:id',async(req,res)=>{
    try {
        const pro = await Project.findByPk(req.params.id, { include: Employee });
        if (!pro) return res.status(404).send("Project not found");
        res.json(pro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching project");
    }
});
router.get("/:pid/employees", async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.pid, {
            include: Employee
        });

        if (!project) {
            return res.status(404).send("Project not found");
        }

        res.json(project.employees);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to retrieve project's employees");
    }
});


router.put('/:id',async(req,res)=>{                //Updating project
    try{
        const pro=await Project.findByPk(req.params.id);
        if(!pro){
            return res.status(404).send("project not found");
        }
        const{pname,description,deadline}=req.body;
        if(pname){
            pro.pname=pname;
        }
        if(description){
            pro.discription=discription;
        }
        if(deadline){
            pro.deadline=deadline;
        }
         await pro.save();
        res.send("Projects Updated!!")
    }catch(err){
        return res.status(500).send("Some error is there!!");
    }
});

router.delete('/:id',async(req,res)=>{       //delete project by id
    try{
        const pro=await Project.findByPk(req.params.id);
        if(!pro){
            return res.status(404).send(" not found!!")
        }
        await pro.destroy();
        res.send("Project deleted!!")
    }catch(err){
        return res.status(500).send("Some error is there")
    }
});

export default router;
