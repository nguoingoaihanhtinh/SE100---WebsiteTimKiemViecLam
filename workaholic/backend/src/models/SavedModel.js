import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Saved = sequelize.define(
  "Saved",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    job_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    modelName: "saved",
    timestamps: true,
  }
);

export default Saved;
