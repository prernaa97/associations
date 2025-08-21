import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Student=sequelize.define("Student",{
    sid:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    studentName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
})
export default Student;