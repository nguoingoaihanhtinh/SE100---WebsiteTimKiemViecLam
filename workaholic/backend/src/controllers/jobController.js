import Company from "../models/CompanyModel.js";
import Job from "../models/JobModel.js";
import JobType from "../models/JobTypeModel.js";
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

    // Fetch jobs with pagination
    const { rows: jobs, count: totalItems } = await Job.findAndCountAll({
      offset,
      limit: limitNumber,
      order: [["createdAt", "DESC"]], // Order by newest jobs first
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
