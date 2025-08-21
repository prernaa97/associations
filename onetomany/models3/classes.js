import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Class = sequelize.define("class", {
  cid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
    timestamps:false
});
export default Class;

