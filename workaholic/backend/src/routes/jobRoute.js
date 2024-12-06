import express from "express";
import * as JobController from "../controllers/jobController.js";

const jobRouter = express.Router();
jobRouter.get("/", JobController.getAllJobs);
export default jobRouter;
