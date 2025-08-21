import { DataTypes } from "sequelize";
import sequelize from "../DB.js";

const IdCard = sequelize.define('IdCard', {
  cID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cardNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  issueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false
});

export default IdCard;
