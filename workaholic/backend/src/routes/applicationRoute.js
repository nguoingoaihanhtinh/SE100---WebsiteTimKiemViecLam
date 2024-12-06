import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";

const applicationRoute = express.Router();

// Define routes for application-related operations
applicationRoute.post("/", ApplicationController.createApplication); // Create an application
applicationRoute.get("/", ApplicationController.getAllApplications); // Get all applications
applicationRoute.get("/:id", ApplicationController.getApplicationById); // Get a single application by ID
applicationRoute.put("/:id", ApplicationController.updateApplication); // Update an application
applicationRoute.delete("/:id", ApplicationController.deleteApplication); // Delete an application
applicationRoute.get("/job/:jobId", ApplicationController.getApplicationsByJobId); // Get applications by Job ID with user details
export default applicationRoute;
