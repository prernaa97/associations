import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const EmployeeProject=sequelize.define("EmployeeProject",{
},{
timestamps:false
});
export default EmployeeProject;