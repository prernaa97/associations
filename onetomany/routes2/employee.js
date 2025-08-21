import { Router } from "express";
import Department from "../models2/department.js";
import Employee from "../models2/employee.js";
import { Op } from "sequelize";

const router=Router();

router.post('/',async(req,res)=>{                         //creating employee
    console.log(req.body);
    const {ename,email,position}= req.body;
    if(!ename)
        {
        return res.status(400).send("employee name is must");
    }
    if(!email)
    {
       return res.status(400).send("email is must");
    }
    if(!position)
    { 
       return res.status(400).send("position is must");
    }
    try{
       const emp = await Employee.create({ ename,email,position}); 
    res.status(201).json({ message: "Employee created Successfully!!", emp });
    }
    catch(err)
    {
        res.send(err);
    }
});   

router.put('/:id/departments', async (req, res) => {        //assigning department to employee
    try{ 
    const emp=await Employee.findByPk(req.params.id);
        if(!emp){
           return res.status(404).send("Employee not found")
        }
      const { did } = req.body;

  // Step 1: Update
      await Employee.update({ did },{ where: { eid: req.params.id } }      //adding department where id=employee id 
  );

  // Step 2: Fetch updated employee
  const updatedemp = await Employee.findByPk(req.params.id);

  res.json({message:"Department assigned to the successfully!!", updatedemp});
}catch(err)
    {
        res.send(err);
    }
});




router.get('/',async(req,res)=>{                   //get all emps
    try{
        const emps=await Employee.findAll();
        if(!emps){
            return res.status(404).send("Employees not found");
        }
        res.json(emps);
    }catch(err){
        return res.status(500).send("Some error is there!!");
    }
});

router.get('/search/position', async (req, res) => { //search emps by position 
    try {
        const {title} = req.query;

        if (!title) {
            return res.status(400).send("Please provide a title to search");
        }

        const emp = await Employee.findAll({
            where: {
                position: {
                    [Op.like]: `%${title}%`
                }
            }
        });

        if (emp.length === 0) {
            return res.status(404).send("No employees found with that position");
        }

        res.json(emp);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching by position");
    }
});

router.get('/search',async(req,res)=>{     //search by name
    try {
        const {name} = req.query;

        if (!name) {
            return res.status(400).send("Please provide a name to search");
        }
            const emp = await Employee.findAll({
            where: {
                ename: {
                    [Op.like]: `%${name}%`
                }
            }
        });
         //console.log("Query param name:", ename);
        if (emp.length === 0) {
            return res.status(404).send("nhi mila rey");
        }

        res.json(emp);
    } catch (err) {
        res.status(500).send("Error searching employees");
    }
});

router.get('/search/multi', async (req, res) => {        //search emps with name or email
    try {
        const text = req.query.text?.trim();           //dont use {text} 

        if (!text) {
            return res.status(400).send("Please provide a search term");
        }

        const employees = await Employee.findAll({
            where: {
                [Op.or]: [
                    { ename: { [Op.like]: `%${text}%` } },
                    { email: { [Op.like]: `%${text}%` } }
                ]
            }
        });

        if (employees.length === 0) {
            return res.status(404).send("No matching employees found");
        }

        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during multi-field search");
    }
});

router.get('/search/starts',async(req,res)=>{  //Get employees whose name starts with a given prefix like "a"

    try {
        const prefix = req.query.prefix?.trim();

        if (!prefix) {
            return res.status(400).send("Please provide a prefix to search");
        }

        const employees = await Employee.findAll({
            where: {
                ename: {
                    [Op.startsWith]: prefix  // or: {[Op.like]: `${prefix}%`}
                }
            }
        });

        if (employees.length === 0) {
            return res.status(404).send("No employees found with that prefix");
        }

        res.json(employees);
    } catch (err) {
        console.error("Error in prefix search:", err);
        res.status(500).send("Error searching employees by prefix");
    }
});

router.get('/search/ends',async(req,res)=>{  //  Get employees whose name ends with a suffix    
    try {
        const suffix = req.query.suffix?.trim();

        if (!suffix) {
            return res.status(400).send("Please provide a suffix to search");
        }

        const employees = await Employee.findAll({
            where: {
                ename: {
                    [Op.like]: `%${suffix}`  // OR use Op.endsWith if supported
                }
            }
        });

        if (employees.length === 0) {
            return res.status(404).send("No employees found with that suffix");
        }

        res.json(employees);
    } catch (err) {
        console.error("Error in suffix search:", err);
        res.status(500).send("Error searching employees by suffix");
    }
});





router.get('/:id',async(req,res)=>{             //get particular emp
    try{
        const emp= await Employee.findByPk(req.params.id);
        if(!emp){
            return res.status(404).send("Employee not found");
        }
        res.json(emp);
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});
router.put('/:id',async(req,res)=>{                //Updating Employees
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
        res.send({message:"Employee updated Successfully!!",emp})
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});
router.delete('/:id',async(req,res)=>{                           //delete by emp id 
    try{
        const emp=await Employee.findByPk(req.params.id);
        if(!emp){
            return res.status(404).send("Employee not found!!")
        }
        await emp.destroy();
        res.send("Employee deleted!!")
    }catch(err){
        return res.status(500).send("Some error is there")
    }
});

router.put('/:id/department/:did',async(req,res)=>{  //  Reassign employee to another department
    try{
        const emp=await Employee.findByPk(req.params.id);
        if(!emp){
            return res.status(404).send("Employee not found")     
           }

           const newDepart= await Department.findByPk(req.params.did);
           if(!newDepart){
            return res.status(404).send("New department not found");
           }
           emp.did=req.params.did;
           await emp.save();
           res.json({ message: "Employee reassigned to new department", emp });
    } catch(err){
            res.status(500).send("Some error is there");
    }
});





    






export default router;
