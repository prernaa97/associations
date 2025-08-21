import express from 'express';
import mongoose from 'mongoose';

import Employee from './models/employee.js';
import Project from './models/project.js';

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/many1").then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Database not connected");
})


app.post('/employees', async (req, res) => {
  try {
    const emp = new Employee(req.body);
    const emp1 = await emp.save();
    res.status(201).json(emp1);
  } catch (err) {
    res.status(500).send("Error adding employee");
  }
});

app.get('/employees', async (req, res) => {
  try {
    const emps = await Employee.find();
    res.json(emps);
  } catch (err) {
    res.status(500).send("Error fetching employees");
  }
});

app.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('projects');
    res.json(emp);
  } catch (err) {
    res.status(500).send("Error fetching employee");
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating employee");
  }
});

app.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.send("Employee deleted");
  } catch (err) {
    res.status(500).send("Error deleting employee");
  }
});

app.post('/projects', async (req, res) => {
  try {
    const p = new Project(req.body);
    const p1 = await p.save();
    res.status(201).json(p1);
  } catch (err) {
    res.status(500).send("Error creating project");
  }
});

app.get('/projects', async (req, res) => {
  try {
    const p = await Project.find();
    res.json(p);
  } catch (err) {
    res.status(500).send("Error fetching projects");
  }
});

app.get('/projects/:id', async (req, res) => {
  try {
    const proj = await Project.findById(req.params.id).populate('employees');
    res.json(proj);
  } catch (err) {
    res.status(500).send("Error fetching project");
  }
});

app.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating project");
  }
});

app.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.send("Project deleted");
  } catch (err) {
    res.status(500).send("Error deleting project");
  }
});

app.post('/assign-project', async (req, res) => {
  const { employeeId, projectId } = req.body;
  try {
    await Employee.findByIdAndUpdate(employeeId, {
      $addToSet: { projects: projectId }
    });
    await Project.findByIdAndUpdate(projectId, {
      $addToSet: { employees: employeeId }
    });
    res.send("Project assigned to employee");
  } catch (err) {
    res.status(500).send("Error assigning project");
  }
});

app.delete('/unassign-project', async (req, res) => {
  const { employeeId, projectId } = req.body;
  try {
    await Employee.findByIdAndUpdate(employeeId, {
      $pull: { projects: projectId }
    });
    await Project.findByIdAndUpdate(projectId, {
      $pull: { employees: employeeId }
    });
    res.send("Project unassigned from employee");
  } catch (err) {
    res.status(500).send("Error unassigning project");
  }
});

app.get('/employees/:id/projects', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('projects');
    res.json(emp.projects);
  } catch (err) {
    res.status(500).send("Error fetching projects");
  }
});

app.get('/projects/:id/employees', async (req, res) => {
  try {
    const proj = await Project.findById(req.params.id).populate('employees');
    res.json(proj.employees);
  } catch (err) {
    res.status(500).send("Error fetching employees");
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
