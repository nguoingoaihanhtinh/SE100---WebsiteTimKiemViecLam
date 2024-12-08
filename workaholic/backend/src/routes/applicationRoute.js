import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";
import { authorize } from "../middleware/authenticate.js";

const applicationRoute = express.Router();
applicationRoute.get("/user", authorize, ApplicationController.getUserApplications);
// Define routes for application-related operations
applicationRoute.post("/", ApplicationController.createApplication); 
applicationRoute.get("/", ApplicationController.getAllApplications); 

applicationRoute.get("/:id", ApplicationController.getApplicationById); 
applicationRoute.put("/:id", ApplicationController.updateApplication); 
applicationRoute.delete("/:id", ApplicationController.deleteApplication);
applicationRoute.get("/job/:jobId", ApplicationController.getApplicationsByJobId); 


export default applicationRoute;
