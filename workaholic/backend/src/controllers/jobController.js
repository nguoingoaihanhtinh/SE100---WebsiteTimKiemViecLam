import { Company, Job, JobType } from "../models/relation.js";
import { Op, Sequelize } from "sequelize";

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
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["id", "name", "feild", "description", "img", "user_id", "address"],
        },
        {
          model: JobType,
          as: "jobType",
          attributes: ["id", "name"],
        },
      ],
    });
    // Prepare the response with pagination metadata
    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        totalItems,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalItems / limitNumber),
        itemsPerPage: limitNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching jobs.",
    });
  }
};
export const getAllJobsByCompanyId = async (req, res) => {
  try {
    // Extract pagination parameters from query string
    const { company_id, page = 1, limit = 10, kw = "" } = req.query;

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
    // Define the search condition for the keyword
    const searchCondition = kw
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${kw}%` } }, // Match title
            { description: { [Op.like]: `%${kw}%` } }, // Match description
          ],
        }
      : {};
    // Fetch jobs with pagination and include related models
    const { rows: jobs, count: totalItems } = await Job.findAndCountAll({
      where: { company_id: company_id, ...searchCondition },
      offset,
      limit: limitNumber,
      order: [["createdAt", "DESC"]], // Order by newest jobs first
      include: [
        {
          model: Company,
          as: "company", // Alias for company (match with association alias)
          attributes: ["id", "name", "feild", "description", "img", "user_id", "address"], // Select specific fields from company
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
      pagination: {
        totalItems,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalItems / limitNumber),
        itemsPerPage: limitNumber,
      },
    });
  } catch (error) {
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
      experience = 0,
      schedule,
      salary_from,
      salary_to,
      valid_date,
      expired_date,
      jobType_id,
      company_id,
      description,
    } = req.body;
    // Validation: You can add additional validation here
    if (
      !title ||
      !position ||
      !schedule ||
      !salary_from ||
      !valid_date ||
      !expired_date ||
      !company_id ||
      !jobType_id ||
      !description
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
      description,
    });

    // Return the newly created job record
    return res.status(201).json(newJob);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params; // Get job id from request parameters
    const {
      title,
      position,
      experience = 0,
      schedule,
      salary_from,
      salary_to,
      valid_date,
      expired_date,
      jobType_id,
      company_id,
      description,
    } = req.body;

    // Validation: Ensure all required fields are present (you can customize validation)
    if (
      !title ||
      !position ||
      !schedule ||
      !salary_from ||
      !valid_date ||
      !expired_date ||
      !company_id ||
      !jobType_id ||
      !description
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
      description,
    });

    // Return the updated job
    return res.status(200).json(updatedJob);
  } catch (error) {
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
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the job by ID
    const job = await Job.findByPk(id, {
      include: [
        {
          model: Company,
          as: "company", // Alias for company (match with association alias)
          attributes: ["id", "name", "feild", "description", "img", "user_id", "address"], // Select specific fields from company
        },
        {
          model: JobType,
          as: "jobType", // Alias for jobType (match with association alias)
          attributes: ["id", "name"], // Select specific fields from jobType
        },
      ],
    });

    // If the job doesn't exist, return a 404 response
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Return a success message
    return res.status(200).json({ message: "Get job successfully", data: job });
  } catch (error) {
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
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job types",
      error: error.message,
    });
  }
};

export const searchJob = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      kw = "",
      jobType_id = null,
      experience = 0,
      longitude,
      lattidue, // Assuming you meant latitude
      salary_from = 0,
      salary_to = 100000000,
    } = req.query;
    console.log("kw:", kw, "id:", jobType_id);
    const offset = (page - 1) * limit;
    const whereClause = {};

    // Create the base `where` clause for filtering by title
    if (kw) {
      whereClause.title = { [Op.like]: `%${kw}%` };
    }

    // Add experience filter if it exists in the query
    if (experience) {
      whereClause.experience = { [Op.gte]: parseInt(experience, 10) }; // Filter jobs with experience >= provided value
    }

    // Add `jobType_id` filter if it exists in the query

    if (jobType_id !== NaN && jobType_id) {
      whereClause.jobType_id = Number(jobType_id); // Filter jobs by job type ID
    }
    // Add salary range filter if it exists
    whereClause.salary_from = { [Op.gte]: parseInt(salary_from, 10) };
    whereClause.salary_to = { [Op.lte]: parseInt(salary_to, 10) };
    // Define the Haversine formula condition
    if (longitude && lattidue) {
      const radiusKm = 60; // 30 km radius
      const earthRadius = 6371; // Earth's radius in km

      const distanceCondition = Sequelize.literal(`
        (
          ${earthRadius} * acos(
            cos(radians(${lattidue})) * cos(radians(company.lattidue)) *
            cos(radians(company.longitude) - radians(${longitude})) +
            sin(radians(${lattidue})) * sin(radians(company.lattidue))
          )
        ) <= ${radiusKm}
      `);

      // Add the distance condition to the query pipeline
      whereClause[Op.and] = [Sequelize.where(distanceCondition, true)];
    }

    // Fetch jobs with pagination
    const jobs = await Job.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Company,
          as: "company",
          required: true, // Only include jobs with a valid company
          attributes: ["name", "img", "longitude", "lattidue"], // Fetch relevant fields
        },
        {
          model: JobType,
          as: "jobType",
          required: false, // Include jobs without a job type
          attributes: ["name"], // Fetch only name field
        },
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    console.log(whereClause);
    const totalPages = Math.ceil(jobs.count / limit);
    // Return the jobs and pagination info
    res.json({
      success: true,
      data: jobs.rows,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
        totalJobs: jobs.count,
        totalPages,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to search jobs" });
  }
};
