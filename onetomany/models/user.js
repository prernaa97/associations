import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User=sequelize.define('User',{
    uid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    uname:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps:false
})

export default User;