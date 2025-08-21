import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Post=sequelize.define("Post",{
    pid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
         type:DataTypes.STRING,
         allowNull:false
    },
    content:{
         type:DataTypes.STRING,
         allowNull:false
    },
    
},
{
        timestamps:false
    });
    export default Post;
