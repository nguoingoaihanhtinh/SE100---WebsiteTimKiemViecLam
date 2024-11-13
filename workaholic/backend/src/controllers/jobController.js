import Job from "../models/JobModel.js";
import JobType from "../models/JobTypeModel.js";


export const getAllJobs = async (req, res) => {
    try {
      const { page = 1, limit = 10, job_id = null } = req.query;  // Default job_id is null to fetch all jobs
      const offset = (page - 1) * limit;
  
      let jobs;
      let totalJobs;
  
      if (job_id) {
        // If job_id is provided, fetch that specific job
        jobs = await Job.findAll({
          where: { id: job_id },  // Filter by job_id
          limit: 1,  // Only one job should be returned
        });
        totalJobs = jobs.length;  // Only one job will be found, so totalJobs will be 1
      } else {
        // Otherwise, fetch all jobs with pagination
        jobs = await Job.findAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
        });
        totalJobs = await Job.count();  // Count all jobs
      }
  
      const totalPages = job_id ? 1 : Math.ceil(totalJobs / limit);  // If job_id, only one page
  
      res.json({
        currentPage: page,
        totalPages: totalPages,
        totalJobs: totalJobs,
        jobs: jobs,
      });
    } catch (err) {
      console.error('Error fetching jobs:', err);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};
export const getAllJobTypes = async (req, res) => {
    try {
      const jobTypes = await JobType.findAll(); // Fetch all job types from the database
      return res.status(200).json({
        success: true,
        message: 'Job types fetched successfully',
        data: jobTypes
      });
    } catch (error) {
      console.error('Error fetching job types:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch job types',
        error: error.message
      });
    }
  };

// controllers/jobController.js

export const getJobByName = async (req, res) => {
    const { name } = req.params;
    const { page = 1, limit = 10 } = req.query;  // Pagination params
  
    try {
      const offset = (page - 1) * limit;
  
      const jobs = await Job.findAll({
        where: { title: { [Op.like]: `%${name}%` } },  // Search for jobs with similar names
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
  
      const totalJobs = await Job.count({
        where: { title: { [Op.like]: `%${name}%` } }
      });
  
      const totalPages = Math.ceil(totalJobs / limit);
  
      res.json({
        currentPage: page,
        totalPages: totalPages,
        totalJobs: totalJobs,
        jobs: jobs,
      });
    } catch (err) {
      console.error('Error fetching job:', err);
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  };
  
