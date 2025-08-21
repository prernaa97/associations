import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Teacher = sequelize.define("teacher", {
  tid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    timestamps:false
});

export default Teacher;