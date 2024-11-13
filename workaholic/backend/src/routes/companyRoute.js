import express from 'express';
import * as CompanyController from '../controllers/companyController.js';

const companyRoute = express.Router();

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies with pagination or a specific company by company_id
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of companies to retrieve per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: company_id
 *         in: query
 *         description: The company ID to retrieve a specific company. If not provided, all companies are retrieved.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: List of companies or a specific company with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                   example: 5
 *                 totalCompanies:
 *                   type: integer
 *                   description: The total number of companies
 *                   example: 50
 *                 companies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The company ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The company name
 *                         example: Tech Corp
 *                       img:
 *                         type: string
 *                         description: The company image URL
 *                         example: "http://example.com/image.jpg"
 *                       jobAvailable:
 *                         type: integer
 *                         description: The number of available jobs in the company
 *                         example: 10
 *       500:
 *         description: Failed to fetch companies
 *   responses:
 *     500:
 *       description: Internal server error
 */

companyRoute.route('/companies').get(CompanyController.getAllCompanies);

export default companyRoute;
