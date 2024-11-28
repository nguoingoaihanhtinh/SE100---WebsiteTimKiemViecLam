// models/Job.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import JobType from "./JobTypeModel.js";
import Company from "./CompanyModel.js";
import User from "./UserModel.js";
import Application from "./ApplicationModel.js";
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
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    number_rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
