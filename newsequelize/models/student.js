import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const student=sequelize.define('student',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNULL:false,
        
    },
    address:{
        type:DataTypes.STRING,
        allowNULL:false
    },
    mob:{
        type:DataTypes.STRING,
        unique:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNULL:false,
        
    }
        
});
export default student;
