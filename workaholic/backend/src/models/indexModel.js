// models/indexModel.js

import Company from "./CompanyModel.js";
import Job from "./JobModel.js";
import JobType from "./JobTypeModel.js";



// Define relationships between models

  // A Job belongs to a Company
  Job.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

  // A Company can have many Jobs
  Company.hasMany(Job, { foreignKey: 'company_id' });

  Job.belongsTo(JobType, { foreignKey: 'jobType_id' });  // A Job belongs to one JobType
  JobType.hasMany(Job, { foreignKey: 'jobType_id' }); 

export {Job, Company};
