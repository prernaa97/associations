import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Employee from "./employee.js";

const Project=sequelize.define("Project",{
    pid:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    pname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    deadline:{
        type:DataTypes.DATE,       //"2025-07-01   YYYY-MM-DD"
        allowNull:false
    }
},{
    timestamps:false
})
export default Project;