import Company from "../models/CompanyModel.js";
import Job from "../models/JobModel.js";
import JobType from "../models/JobTypeModel.js";
import { Op } from "sequelize";

export const getAllJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, typeSlt = null } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {}; // Default: no filter

    if (typeSlt) {
      // console.log('Looking for job type:', typeSlt);
      try {
        const jobType = await JobType.findOne({ where: { name: typeSlt } });
        if (!jobType) {
          console.log("Job type not found");
          return res.status(404).json({ error: "Job type not found" });
        }
        whereClause.jobType_id = jobType.id;
      } catch (jobTypeError) {
        console.error("Error finding JobType:", jobTypeError);
        return res.status(500).json({ error: "Failed to find job type" });
      }
    }

    // console.log('whereClause:', whereClause);

    const jobs = await Job.findAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        { model: JobType, as: "jobType", attributes: ["name"] },
        { model: Company, as: "company", attributes: ["img", "name"] },
      ],
    });

    const totalJobs = await Job.count({ where: whereClause });
    const totalPages = Math.ceil(totalJobs / limit);

    res.json({
      status: "success",
      data: jobs,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalJobs,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
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



