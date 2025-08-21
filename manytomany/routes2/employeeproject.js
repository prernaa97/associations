import { Router } from "express";
import Employee from "../models2/employee.js";
import Project from "../models2/project.js";

const router = Router();
router.post("/assign-project", async (req, res) => {
    const { eid, pid } = req.body;

    if (!eid || !pid) {
        return res.status(400).send("eid and pid are required");
    }

    try {
        const employee = await Employee.findByPk(eid);
        const project = await Project.findByPk(pid);

        if (!employee || !project) {
            return res.status(404).send("Employee or Project not found");
        }

        await employee.addProject(project); // Sequelize magic method
        res.send("Project assigned to employee successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to assign project");
    }
});


router.delete("/unassign-project", async (req, res) => {
    const { eid, pid } = req.body;

    if (!eid || !pid) {
        return res.status(400).send("eid and pid are required");
    }

    try {
        const employee = await Employee.findByPk(eid);
        const project = await Project.findByPk(pid);

        if (!employee || !project) {
            return res.status(404).send("Employee or Project not found");
        }

        await employee.removeProject(project); // Sequelize magic method
        res.send("Project unassigned from employee successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to unassign project");
    }
});



export default router;