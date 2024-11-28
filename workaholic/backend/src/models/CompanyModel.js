// models/Company.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Job from "./JobModel.js";

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    img: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feild: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lattidue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    modelName: "company",
    timestamps: true,
  }
);

export default Company;
