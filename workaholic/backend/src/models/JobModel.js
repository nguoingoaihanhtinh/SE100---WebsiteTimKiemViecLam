// models/Job.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const Job = sequelize.define(
  "Job",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valid_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expired_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "companys", // Table name
        key: "id",
      },
    },
    jobType_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "jobTypes", // Table name
        key: "id",
      },
    },
  },
  {
    modelName: "job",
    timestamps: true,
  }
);

export default Job;
