// models/JobType.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const JobType = sequelize.define(
  "JobType",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "jobType",
    timestamps: true,
  }
);

export default JobType;
