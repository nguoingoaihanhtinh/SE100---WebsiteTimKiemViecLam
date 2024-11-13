// models/Job.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Job = sequelize.define('Job', {
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
    allowNull: false,
  },
  location: {
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Company', // Referring to the Company model
      key: 'id',
    },
    allowNull: false,
  },
  jobType_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'JobType',  // Referring to the JobType model
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'job', // Specify the actual table name in the database
  timestamps: false,
});

export default Job;
