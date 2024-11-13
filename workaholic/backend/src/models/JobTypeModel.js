// models/JobType.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobType = sequelize.define('JobType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfJobs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'job_type', // Specify the actual table name in the database
  timestamps: false,
});

export default JobType;
