import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Project from "./project.js";

const Employee=sequelize.define("Employee",{
    eid:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    ename:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    position:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
})
export default Employee;