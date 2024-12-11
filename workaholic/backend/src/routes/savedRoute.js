import express from "express";
import * as SavedController from "../controllers/savedController.js";
import { authorize } from "../middleware/authenticate.js";


const savedRouter = express.Router();

// Define routes for saved items
savedRouter.get("/", authorize, SavedController.getSavedJobs); 
savedRouter.post("/", authorize, SavedController.saveJob); 
savedRouter.delete("/:id", authorize, SavedController.removeSavedJob); 

export default savedRouter;
