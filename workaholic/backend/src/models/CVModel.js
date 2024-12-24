import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CV = sequelize.define(
  "CV",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: true },
    skills: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    experience: { type: DataTypes.JSON, allowNull: true }, // JSON format for experience details
    education: { type: DataTypes.JSON, allowNull: true }, // JSON format for education details
    certifications: { type: DataTypes.JSON, allowNull: true }, // JSON format for certifications
  },
  {
    modelName: "cv",
    timestamps: true,
  }
);

export default CV;
