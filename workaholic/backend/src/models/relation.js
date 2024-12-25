import Notification from "./NotiModel.js";
import User from "./UserModel.js";
import Job from "./JobModel.js";
import JobType from "./JobTypeModel.js";
import Application from "./ApplicationModel.js";
import Company from "./CompanyModel.js";
import Saved from "./SavedModel.js";
import CV from "./CVModel.js";
import Rating from "./RatingModel.js";
// For user
User.hasMany(Notification, {
  foreignKey: "user_id", // Links Notification.user_id to User.id
  as: "notifications", // Alias for the relation
});

User.belongsToMany(Job, {
  through: Saved, // Join table
  foreignKey: "user_id", // Key in Saved table referencing User
  otherKey: "job_id", // Key in Saved table referencing Job
  as: "savedJobs", // Alias for the relation
});

User.hasMany(Application, {
  foreignKey: "user_id",
  as: "applications",
});
User.hasOne(Company, { foreignKey: "user_id", as: "Company" });
User.hasMany(CV, {
  foreignKey: "user_id", // Links CV.user_id to User.id
  as: "cvs", // Alias for the relation
});
User.hasMany(Rating, {
  foreignKey: "UserId", // Links Rating.UserId to User.id
  as: "ratings", // Alias for the relation
});

// For Noti
Notification.belongsTo(User, {
  foreignKey: "user_id", // Links Notification.user_id to User.id
  as: "user", // Alias for the relation
});

// For JobType
JobType.hasMany(Job, { foreignKey: "jobType_id", as: "jobs" });

//Jobs
Job.belongsTo(JobType, { foreignKey: "jobType_id", as: "jobType" });
Job.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Job.belongsToMany(User, {
  through: Saved, // Join table
  foreignKey: "job_id", // Key in Saved table referencing Job
  otherKey: "user_id", // Key in Saved table referencing User
  as: "savedByUsers", // Alias for the relation
});
Job.hasMany(Application, {
  foreignKey: "job_id",
  as: "applications",
});

// Company
Company.hasMany(Job, { foreignKey: "company_id", as: "jobs" });
Company.belongsTo(User, { foreignKey: "user_id", as: "Employer" });
Company.hasMany(Rating, {
  foreignKey: "CompanyId", // Links Rating.CompanyId to Company.id
  as: "ratings", // Alias for the relation
});
//Application
Application.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Application.belongsTo(Job, {
  foreignKey: "job_id",
  as: "job",
});
Saved.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Saved.belongsTo(Job, {
  foreignKey: "job_id",
  as: "job",
});
CV.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
Rating.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
});
Rating.belongsTo(Company, {
  foreignKey: "CompanyId",
  as: "company",
});

export { User, Notification, Job, JobType, Application, Company, Saved, CV, Rating };
