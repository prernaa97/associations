import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const StudentCourse=sequelize.define("StudentCourse",{
},{
timestamps:false
});
export default StudentCourse;