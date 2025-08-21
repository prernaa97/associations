import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Employee=sequelize.define('employees',{
   
    eid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
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
}
);
export default Employee;