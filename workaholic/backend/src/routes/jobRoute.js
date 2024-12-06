import express from "express";
import * as JobController from "../controllers/jobController.js";

const jobRouter = express.Router();
jobRouter.get("/", JobController.getAllJobs);
jobRouter.get("/getAllType", JobController.getAllJobTypes);
jobRouter.get("/search", JobController.searchJob);
export default jobRouter;
