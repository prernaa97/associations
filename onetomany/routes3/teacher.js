import { Router } from "express";
import Teacher from "../models3/teacher.js";
import Class from "../models3/classes.js";
import { Op } from "sequelize";

const router=Router();

// Add a Teacher
router.post("/teachers", async (req, res) => {
  try {
    const { tname, subject } = req.body;
    if(!tname){
        return res.status(404).send("Teacher name is must");
    }
    if(!subject){
        return res.status(404).send("Subject is must");
    }
    const teacher = await Teacher.create({ tname, subject });
    res.status(201).json({ message: "Teacher added", teacher });
  } catch (err) {
    res.status(500).send("Error adding teacher");
  }
});

// Assign a Class to a Teacher           there are two ways check employee departmet routes
router.post("/teachers/:id/classes", async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);  
    if (!teacher) return res.status(404).send("Teacher not found");

    const { cname, schedule } = req.body;
    const newClass = await Class.create({
      cname,
      schedule,
      tid: teacher.id,
    });

    res.status(201).json({ message: "Class assigned to teacher", newClass });   
  } catch (err) {
    res.status(500).send("Error assigning class");
  }
});
router.get('/',async(req,res)=>{    //get all teachers
    try{
        const teachers=await Teacher.findAll({include:Class});
        res.json(teachers);

    }catch(err){
          return res.status(500).send("Some error is there!!");
    }
});

router.get('/search/subject',async(req,res)=>{ //search teacher by subject
    try {
        const {subject} = req.query;

        if (!subject) {
            return res.status(400).send("Please provide a title to search");
        }

        const teacher = await Teacher.findAll({
            where: {
                subject: {
                    [Op.like]: `%${subject}%`
                }
            },include:Class
        });

        if (teacher.length === 0) {
            return res.status(404).send("No teachers found with that subject");
        }

        res.json(teacher);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching by subject");
    }
});


router.get('/search',async(req,res)=>{     //search by name
    try {
        const {name} = req.query;

        if (!name) {
            return res.status(400).send("Please provide a name to search");
        }
            const teacher = await Teacher.findAll({
            where: {
                tname: {
                    [Op.like]: `%${name}%`
                }
            }
        });
         //console.log("Query param name:", tname);
        if (teacher.length === 0) {
            return res.status(404).send("No teacher found");
        }

        res.json(teacher);
    } catch (err) {
        res.status(500).send("Error searching teacher"); 
    }
});

router.get('/search/multi', async (req, res) => {        //search teachers with name or subject
    try {
        const text = req.query.text?.trim();           //dont use {text} 

        if (!text) {
            return res.status(400).send("Please provide a search term");
        }

        const teacher = await Teacher.findAll({
            where: {
                [Op.or]: [
                    { tname: { [Op.like]: `%${text}%` } },
                    { subject: { [Op.like]: `%${text}%` } }
                ]
            }
        });       

        if (teacher.length === 0) {
            return res.status(404).send("No matching teachers found");
        }

        res.json(teacher);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during multi-field search");
    }
});

router.get('/search/starts',async(req,res)=>{  //Get teachers whose name starts with a given prefix like "a"

    try {
        const prefix = req.query.prefix?.trim();  

        if (!prefix) {
            return res.status(400).send("Please provide a prefix to search");
        }

        const teacher = await Teacher.findAll({
            where: {
                tname: {
                    [Op.startsWith]: prefix  // or: {[Op.like]: `${prefix}%`}
                }
            }
        });

        if (teacher.length === 0) {
            return res.status(404).send("No employees found with that prefix");
        }

        res.json(teacher);
    } catch (err) {
        console.error("Error in prefix search:", err);
        res.status(500).send("Error searching teachers by prefix");
    }
});

router.get('/search/ends',async(req,res)=>{  //  Get teachers whose name ends with a suffix    
    try {
        const suffix = req.query.suffix?.trim();

        if (!suffix) {
            return res.status(400).send("Please provide a suffix to search");
        }

        const teacher = await Teacher.findAll({
            where: {
                tname: {
                    [Op.like]: `%${suffix}`  // OR use Op.endsWith if supported
                }
            }
        });

        if (teacher.length === 0) {
            return res.status(404).send("No employees found with that suffix");
        }

        res.json(teacher);
    } catch (err) {
        console.error("Error in suffix search:", err);
        res.status(500).send("Error searching teachers by suffix");
    }
});



router.get('/:id',async(req,res)=>{         //get particular teacher
    try{
        const teacher=await Teacher.findByPk(req.params.id,{include:Class});
        res.json(teacher)
    }
    catch(err){
        return res.status(500).send("Some error is there!!");
    }
});

router.put('/:id',async(req,res)=>{      //updating teacher by ids 
    try{
        const teacher=await Teacher.findByPk(req.params.id);
        const {tname,subject}=req.body;
        if(tname){
            teacher.tname=tname;
        }
        if(subject){
            teacher.subject=subject;
        }
        await teacher.save();
        res.json("Teacher updated")
    }catch(err){
        return res.status(500).send("Some error is there");
    }
}); 

router.delete('/:id',async(req,res)=>{       //Deleting teachers by id BY DEFAULT, including classes
    try{
        const teacher=await Teacher.findByPk(req.params.id);
        if(!teacher){
            res.status(500).send("Teacher not found");
        }
        await teacher.destroy()
        res.send("Teacher deleted!!")
    }catch(err){
        return res.status(404).send("Some error is there!!")
    }
});
router.get('/:id/classes',async(req,res)=>{   //getting classes by their teacher id
    try{
        const teacher=await Teacher.findByPk(req.params.id,{include:Class});
        if(!teacher){
            return res.status(404).send("Department not found");
        }
       // res.json(depart.employees);
        res.json({teacher: teacher.tname,  //optional
                 subject: teacher.subject,  //optional
                 classes: teacher.classes});//teacher.classes is also fine will provide list of associated emps
    }catch(err){
        return res.status(500).send("error in fetching the employees");
    }
});









export default router;