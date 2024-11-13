// models/Company.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Company = sequelize.define('Company', {
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
  jobAvailable: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Assuming by default there are no available jobs
  },
}, {
  tableName: 'company',
  timestamps: false,
});

export default Company;
