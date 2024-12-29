// models/Company.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
    coverimg: {
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
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    number_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lattidue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional
      references: {
        model: "users", // Table name for User
        key: "id",
      },
    },
  },
  {
    modelName: "company",
    timestamps: true,
  }
);

export default Company;
