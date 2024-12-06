// controllers/companyController.js

import { Company, User } from "../models/relation.js";

export const getAllCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default limit 10 if not provided

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Get the companies with pagination
    const companies = await Company.findAll({
      limit: limit,
      offset: offset,
    });

    // Get the total count of companies for pagination purposes
    const totalCompanies = await Company.count();

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalCompanies / limit),
      totalCompanies: totalCompanies,
      companies: companies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching companies" });
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the company ID
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing company ID.",
      });
    }

    // Fetch the company by ID, including related models if necessary
    const company = await Company.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "Employer", // Adjust alias based on your association setup
          attributes: ["id", "user_name", "email"], // Include specific fields from User
        },
      ],
    });

    // Check if company exists
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Return the company data
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the company.",
    });
  }
};
export const getCompanyByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Validate the user ID
    if (!user_id || isNaN(parseInt(user_id, 10))) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID.",
      });
    }

    // Fetch the company by user_id, including related models if necessary
    const company = await Company.findOne({
      where: { user_id }, // Filter by user_id
      include: [
        {
          model: User,
          as: "Employer", // Alias as defined in the association
          attributes: ["id", "user_name", "email", "role", "avatar"], // Include specific fields from User
        },
      ],
    });

    // Check if company exists
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found for the provided user ID.",
      });
    }

    // Return the company data
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Error fetching company by user ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the company.",
    });
  }
};
