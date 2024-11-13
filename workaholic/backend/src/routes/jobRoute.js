import express from 'express';
import * as JobController from '../controllers/jobController.js';

const jobRoute = express.Router();

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs with pagination or a specific job by job_id
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
 *         description: The number of jobs to retrieve per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: job_id
 *         in: query
 *         description: The job ID to retrieve a specific job. If not provided, all jobs are retrieved.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: List of jobs or a specific job with pagination metadata
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
 *                 totalJobs:
 *                   type: integer
 *                   description: The total number of jobs
 *                   example: 50
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The job ID
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: The job title
 *                         example: Software Engineer
 *                       rating:
 *                         type: number
 *                         description: The job rating
 *                         example: 4.5
 *                       location:
 *                         type: string
 *                         description: The job location
 *                         example: New York
 *                       position:
 *                         type: string
 *                         description: The job position
 *                         example: Full-time
 *                       experience:
 *                         type: string
 *                         description: The experience required for the job
 *                         example: 3+ years
 *                       schedule:
 *                         type: string
 *                         description: The work schedule
 *                         example: Flexible
 *                       type:
 *                         type: string
 *                         description: The type of job
 *                         example: Permanent
 *                       salary:
 *                         type: string
 *                         description: The salary for the job
 *                         example: $80,000 - $100,000
 *                       paymentBy:
 *                         type: string
 *                         description: How the payment is made
 *                         example: Monthly
 *                       company_id:
 *                         type: integer
 *                         description: The company ID for the job
 *                         example: 1
 *       500:
 *         description: Failed to fetch jobs
 *   responses:
 *     500:
 *       description: Internal server error
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


export default jobRoute;
