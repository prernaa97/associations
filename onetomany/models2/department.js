import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Department=sequelize.define('department',{
    did:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    dname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});
export default Department; 