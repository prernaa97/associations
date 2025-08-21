import { DataTypes } from "sequelize";
import sequelize from "../DB.js"; // Make sure .js is included

const Employee = sequelize.define('Employee', {
  emid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  empname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empemail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empdesignation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empjoinDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Employee;
