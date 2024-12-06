import express from "express";
import * as JobController from "../controllers/jobController.js";

const jobRouter = express.Router();
jobRouter.get("/", JobController.getAllJobs);
jobRouter.get("/company", JobController.getAllJobsByCompanyId);
export default jobRouter;
