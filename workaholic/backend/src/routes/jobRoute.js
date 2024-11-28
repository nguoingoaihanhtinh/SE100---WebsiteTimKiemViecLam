import express from 'express';
import * as JobController from '../controllers/jobController.js';

const jobRoute = express.Router();

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve jobs with optional pagination and filtering by job type
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of jobs per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: typeSlt
 *         in: query
 *         description: Filter jobs by job type (e.g., Technology, Sales)
 *         required: false
 *         schema:
 *           type: string
 *           example: Technology
 *     responses:
 *       200:
 *         description: Successfully retrieved jobs
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
 *                   description: Total number of pages available
 *                   example: 5
 *                 totalJobs:
 *                   type: integer
 *                   description: Total number of jobs available
 *                   example: 50
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the job
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: Title of the job
 *                         example: Software Engineer
 *                       rating:
 *                         type: number
 *                         description: Average rating of the job
 *                         example: 4.5
 *                       location:
 *                         type: string
 *                         description: Location of the job
 *                         example: New York
 *                       position:
 *                         type: string
 *                         description: Job position (e.g., Full-time, Part-time)
 *                         example: Full-time
 *                       experience:
 *                         type: string
 *                         description: Required experience for the job
 *                         example: 3+ years
 *                       schedule:
 *                         type: string
 *                         description: Work schedule (e.g., Flexible, Fixed)
 *                         example: Flexible
 *                       type:
 *                         type: string
 *                         description: Job type (e.g., Technology, Sales)
 *                         example: Technology
 *                       salary:
 *                         type: string
 *                         description: Salary range for the job
 *                         example: $80,000 - $100,000
 *                       paymentBy:
 *                         type: string
 *                         description: Payment frequency (e.g., Monthly, Weekly)
 *                         example: Monthly
 *                       company_id:
 *                         type: integer
 *                         description: Unique identifier for the company offering the job
 *                         example: 1
 *       400:
 *         description: Invalid query parameters (e.g., invalid page or limit values)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid query parameters
 *       404:
 *         description: No jobs found matching the specified filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Job type not found
 *       500:
 *         description: Internal server error occurred while fetching jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to fetch jobs
 */

jobRoute.route('/jobs').get(JobController.getAllJobs);

// Food Types Routes
/**
 * @swagger
 * /api/jobs/getAllType:
 *   get:
 *     summary: Get all job types
 *     responses:
 *       200:
 *         description: A list of job types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: 'Job types fetched successfully'
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The job type ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The job type name
 *                         example: Permanent
 *       500:
 *         description: Failed to fetch job types
 */
jobRoute.route('/jobs/getAllType').get(JobController.getAllJobTypes);

/**
 * @swagger
 * /api/jobs/search:
 *   get:
 *     summary: Search jobs by keyword with optional pagination
 *     tags:
 *       - Jobs
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of jobs per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: kw
 *         in: query
 *         description: Keyword to search in job titles, locations, or positions
 *         required: false
 *         schema:
 *           type: string
 *           example: Engineer
 *     responses:
 *       200:
 *         description: Successfully retrieved jobs matching the keyword
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
 *                   description: Total number of pages available
 *                   example: 5
 *                 totalJobs:
 *                   type: integer
 *                   description: Total number of jobs matching the keyword
 *                   example: 50
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the job
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: Title of the job
 *                         example: Software Engineer
 *       404:
 *         description: No jobs found matching the keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: No jobs found
 *       500:
 *         description: Internal server error occurred while searching jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to search jobs
 */
jobRoute.route('/jobs/search').get(JobController.searchJob);
export default jobRoute;
