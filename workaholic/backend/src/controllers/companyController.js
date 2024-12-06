// controllers/companyController.js

import {Company} from "../models/relation.js";



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
