import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./UserModel.js";
import Company from "./CompanyModel.js";

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    RatingValue: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
  },
  {
    modelName: "rating",
    timestamps: true,
  }
);

// Associations
User.hasMany(Rating, { foreignKey: "UserId" });
Company.hasMany(Rating, { foreignKey: "CompanyId" });
Rating.belongsTo(User, { foreignKey: "UserId" });
Rating.belongsTo(Company, { foreignKey: "CompanyId" });

export default Rating;
