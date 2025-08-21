import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Course=sequelize.define("Course",{
    cid:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    courseName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
})
export default Course;