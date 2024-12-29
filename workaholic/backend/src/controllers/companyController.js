// controllers/companyController.js

import { Company, User } from "../models/relation.js";

export const getAllCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || null;

    const offset = (page - 1) * limit;
    const whereCondition = type ? { feild: type } : {};
    //Loi chinh ta feild

    const companies = await Company.findAll({
      where: whereCondition,
      limit: limit,
      offset: offset,
    });

    const totalCompanies = await Company.count({
      where: whereCondition,
    });

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

export const createCompany = async (req, res) => {
  try {
    const { img, name, feild, description, rating, number_rating, longitude, lattidue, address, user_id } = req.body;

    const newCompany = await Company.create({
      img,
      name,
      feild,
      description,
      rating,
      number_rating,
      longitude,
      lattidue,
      address,
      user_id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: newCompany,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the company.",
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const updatedCompany = await company.update(updates);

    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the company.",
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    await company.destroy();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the company.",
    });
  }
};
