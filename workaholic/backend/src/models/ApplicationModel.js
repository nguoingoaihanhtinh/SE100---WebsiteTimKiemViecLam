// models/Company.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Table name
        key: "id",
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "jobs", // Table name
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(["pending", "approved", "rejected"]),
      defaultValue: "pending",
    },
    date_applied: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    letter: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    modelName: "application",
    timestamps: true,
  }
);

export default Application;
