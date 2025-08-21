// app.js
import express from "express";
import mongoose from "mongoose";
import teacherRoutes from "./routes/teacher.routes.js";
import courseRoutes from "./routes/course.routes.js";
import studentRoutes from "./routes/student.routes.js";
import profileRoutes from "./routes/profile.routes.js"

const app = express();
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/allinone").then(()=>{
    console.log("Database connected");
}).catch(()=>{
    console.log("Some error is there in connection");
});


// Mount all routes
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);
app.use("/profiles", profileRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Mongoose Associations API Running");
});

app.listen(4000,()=>{
    console.log("Server Started");
})
