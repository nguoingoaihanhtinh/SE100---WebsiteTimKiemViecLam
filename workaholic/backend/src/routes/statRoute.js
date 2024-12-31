import express from "express";
import * as StatController from "../controllers/statController.js";
import { authorize } from "../middleware/authenticate.js";

const statRouter = express.Router();

// Define routes for saved items
statRouter.get("/monthly-user-change", StatController.getMonthlyUserStats);

export default statRouter;
