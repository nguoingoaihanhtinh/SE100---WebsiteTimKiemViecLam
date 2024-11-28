import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM("User", "Employer", "Admin"),
      allowNull: false,
      defaultValue: "User",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cv_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "user",
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);
export default User;
