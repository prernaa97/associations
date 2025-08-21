import { Router } from "express";
import Teacher from "../models3/teacher.js";
import Class from "../models3/classes.js";
import { Op } from "sequelize";

const router =Router();


router.get('/',async(req,res)=>{                   //get all emps
    try{
        const cls=await Class.findAll();
        if(!cls){
            return res.status(404).send("Employees nit found");
        }
        res.json(cls);
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});


router.get('/search/teacher',async(req,res)=>{  //classes where teachers name constains search string
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send("Please provide a teacher name to search");
    }

    const classes = await Class.findAll({
      include: {
        model: Teacher,
        where: {
          tname: {
            [Op.like]: `%${name}%`
          }
        }
      }
    });

    if (classes.length === 0) {
      return res.status(404).send("No classes found for that teacher name");
    }

    res.json(classes);

  } catch (err) {
    console.error("Error searching classes by teacher name:", err);
    res.status(500).send("Error while searching");
  }
});



router.get('/search/schedule', async (req, res) => { //search classes by schedule
    try {
        const {schedule} = req.query;

        if (!schedule) {
            return res.status(400).send("Please provide a schedule to search");
        }

        const cls = await Class.findAll({
            where: {
            schedule: {
                    [Op.like]: `%${schedule}%`
                }
            }
        });

        if (cls.length === 0) {
            return res.status(404).send("No eclasses found with that schedule");
        }

        res.json(cls);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching by schedule");
    }
});


router.get('/search',async(req,res)=>{     //search classes by name
    try {
        const {name} = req.query;

        if (!name) {
            return res.status(400).send("Please provide a name to search");
        }
            const cls = await Class.findAll({
            where: {
                cname: {
                    [Op.like]: `%${name}%`
                }
            }
        });
         //console.log("Query param name:", ename);
        if (cls.length === 0) {
            return res.status(404).send("No classes found");
        }

        res.json(cls);
    } catch (err) {
        res.status(500).send("Error searching classes");
    }
});






router.get('/:id',async(req,res)=>{             //get particular class with teacher details
    try{
        const cls= await Class.findByPk(req.params.id,{include:Teacher});
        if(!cls){
            return res.status(404).send("classs not found");
        }
        res.json(cls);
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});

router.put('/:id',async(req,res)=>{                //Updating classes
    try{
        const cls=await Class.findByPk(req.params.id);
        if(!cls){
            return res.status(404).send("class not found");
        }
        const{cname,schedule}=req.body;
        if(cname){
            cls.cname=cname;
        }
        if(schedule){
            cls.schedule=schedule;
        }
    
        await cls.save();
        res.send("classes Updated!!")
    }catch(err){
        return res.status(500).send("Some error is there!!")
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const cls=await Class.findByPk(req.params.id);
        if(!cls){
            return res.status(404).send("classes not found!!")
        }
        await cls.destroy();
        res.send("classes deleted!!")
    }catch(err){
        return res.status(500).send("Some error is there")
    }
});

router.put('/:id/teacher/:tid',async(req,res)=>{  //  Reassign class to another teacher
    try{
        const cls=await Class.findByPk(req.params.id);
        if(!cls){
            return res.status(404).send("class not found")     
           }

           const newTeacher= await Teacher.findByPk(req.params.tid);
           if(!newTeacher){
            return res.status(404).send("New teacher not found");
           }    
           cls.tid=req.params.tid;
           await cls.save();
           res.json({ message: "class reassigned to new teacher", cls });
    } catch(err){
            res.status(500).send("Some error is there");
    }
});













export default router;