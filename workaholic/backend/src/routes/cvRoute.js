import express from "express";
import * as CvController from "../controllers/cvController.js";
import { authorize } from "../middleware/authenticate.js";

const cvRouter = express.Router();

// Define routes for saved items
cvRouter.get("/", authorize, CvController.getCVs);
cvRouter.get("/user/:userId", CvController.getCVByUserId);
cvRouter.post("/", authorize, CvController.createCV);
cvRouter.put("/:id", authorize, CvController.updateCV);
cvRouter.delete("/:id", authorize, CvController.deleteCV);

export default cvRouter;
