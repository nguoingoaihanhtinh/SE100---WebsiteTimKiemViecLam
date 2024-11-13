import Company from '../models/CompanyModel.js';

export const getAllCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, company_id = null } = req.query;
    let companies;

    if (company_id) {
      // Fetch a specific company by ID
      companies = await Company.findOne({
        where: { id: company_id },
      });
      if (!companies) {
        return res.status(404).json({ error: 'Company not found' });
      }
      return res.json(companies);
    }

    // Pagination for all companies
    const offset = (page - 1) * limit;
    companies = await Company.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalCompanies = await Company.count();
    const totalPages = Math.ceil(totalCompanies / limit);

    res.json({
      currentPage: page,
      totalPages: totalPages,
      totalCompanies: totalCompanies,
      companies: companies,
    });
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};
