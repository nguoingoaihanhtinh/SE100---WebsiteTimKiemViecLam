import { Company, Job, JobType } from "../models/relation.js";
import { Op } from "sequelize";

export const getAllJobs = async (req, res) => {
  try {
    // Extract pagination parameters from query string
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate pagination parameters
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters. 'page' and 'limit' must be positive integers.",
      });
    }

    // Calculate offset for pagination
    const offset = (pageNumber - 1) * limitNumber;

    // Fetch jobs with pagination and include related models
    const { rows: jobs, count: totalItems } = await Job.findAndCountAll({
      offset,
      limit: limitNumber,
      order: [["createdAt", "DESC"]], // Order by newest jobs first
      include: [
        {
          model: Company,
          as: "company", // Alias for company (match with association alias)
          attributes: ["id", "name", "feild", "description", "img", "user_id"], // Select specific fields from company
        },
        {
          model: JobType,
          as: "jobType", // Alias for jobType (match with association alias)
          attributes: ["id", "name"], // Select specific fields from jobType
        },
      ],
    });

    // Prepare the response with pagination metadata
    res.status(200).json({
      success: true,
      data: jobs,
      meta: {
        totalItems,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalItems / limitNumber),
        itemsPerPage: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching jobs.",
    });
  }
};
export const getAllJobsByCompanyId = async (req, res) => {
  try {
    // Extract pagination parameters from query string
    const { company_id, page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate pagination parameters
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters. 'page' and 'limit' must be positive integers.",
      });
    }

    // Calculate offset for pagination
    const offset = (pageNumber - 1) * limitNumber;

    // Fetch jobs with pagination and include related models
    const { rows: jobs, count: totalItems } = await Job.findAndCountAll({
      where: { company_id: company_id },
      offset,
      limit: limitNumber,
      order: [["createdAt", "DESC"]], // Order by newest jobs first
      include: [
        {
          model: Company,
          as: "company", // Alias for company (match with association alias)
          attributes: ["id", "name", "feild", "description", "img", "user_id"], // Select specific fields from company
        },
        {
          model: JobType,
          as: "jobType", // Alias for jobType (match with association alias)
          attributes: ["id", "name"], // Select specific fields from jobType
        },
      ],
    });

    // Prepare the response with pagination metadata
    res.status(200).json({
      success: true,
      data: jobs,
      meta: {
        totalItems,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalItems / limitNumber),
        itemsPerPage: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching jobs.",
    });
  }
};
export const createJob = async (req, res) => {
  try {
    const {
      title,
      position,
      experience,
      schedule,
      salary_from,
      salary_to,
      valid_date,
      expired_date,
      jobType_id,
      company_id,
    } = req.body;

    // Validation: You can add additional validation here
    if (
      !title ||
      !position ||
      !experience ||
      !schedule ||
      !salary_from ||
      !valid_date ||
      !expired_date ||
      !company_id ||
      !jobType_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new job entry
    const newJob = await Job.create({
      title,
      position,
      experience,
      schedule,
      salary_from,
      salary_to,
      valid_date,
      expired_date,
      company_id,
      jobType_id,
    });

    // Return the newly created job record
    return res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params; // Get job id from request parameters
    const {
      title,
      position,
      experience,
      schedule,
      salary_from,
      salary_to,
      valid_date,
      expired_date,
      jobType_id,
      company_id,
    } = req.body;

    // Validation: Ensure all required fields are present (you can customize validation)
    if (
      !title ||
      !position ||
      !experience ||
      !schedule ||
      !salary_from ||
      !valid_date ||
      !expired_date ||
      !company_id ||
      !jobType_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the job by ID
    const job = await Job.findByPk(id);

    // If the job doesn't exist, return a 404 response
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Update the job record
    const updatedJob = await job.update({
      title,
      position,
      experience,
      schedule,
      salary_from,
      salary_to,
      valid_date,
      expired_date,
      company_id,
      jobType_id,
    });

    // Return the updated job
    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params; // Get job id from request parameters

    // Find the job by ID
    const job = await Job.findByPk(id);

    // If the job doesn't exist, return a 404 response
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Delete the job record
    await job.destroy();

    // Return a success message
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const getAllJobTypes = async (req, res) => {
  try {
    // Fetch all job types from the database
    const jobTypes = await JobType.findAll(); // Make sure JobType is correctly defined in your models

    // If no job types found, return an appropriate message
    if (jobTypes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No job types found",
      });
    }

    // Return successful response with the fetched job types
    return res.status(200).json({
      success: true,
      message: "Job types fetched successfully",
      data: jobTypes,
    });
  } catch (error) {
    // Log error and send back a response with the error details
    console.error("Error fetching job types:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job types",
      error: error.message,
    });
  }
};

export const searchJob = async (req, res) => {
  try {
    const { page = 1, limit = 10, kw = "" } = req.query;
    const offset = (page - 1) * limit;

    // Search for jobs by title only
    const jobs = await Job.findAll({
      where: {
        title: { [Op.like]: `%${kw}%` }, // Only filter jobs by title
      },
      include: [
        {
          model: Company,
          as: "company",
          required: false, // Ensure jobs without a company are still included
          attributes: ["name", "img"], // Only fetch name and img from the company
        },
        {
          model: JobType,
          as: "jobType",
          required: false, // Ensure jobs without a company are still included
          attributes: ["name"], // Only fetch name and img from the company
        },
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    // Count the total number of jobs matching the search criteria
    const totalJobs = await Job.count({
      where: {
        title: { [Op.like]: `%${kw}%` }, // Only count jobs with matching titles
      },
      include: [
        {
          model: Company,
          as: "company",
          required: false,
        },
      ],
    });

    const totalPages = Math.ceil(totalJobs / limit);

    // Return the jobs and pagination info
    res.json({
      status: "success",
      data: jobs,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
        totalJobs,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error searching jobs:", err);
    res.status(500).json({ error: "Failed to search jobs" });
  }
};
