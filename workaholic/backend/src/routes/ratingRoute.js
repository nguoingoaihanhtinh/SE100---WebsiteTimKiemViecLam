import express from "express";
import * as RatingController from "../controllers/ratingController.js";
import { authorize } from "../middleware/authenticate.js";

const ratingRouter = express.Router();

// Define routes for ratings
ratingRouter.get("/user", authorize, RatingController.getRatingsByUserId);
ratingRouter.get("/company/:companyId", RatingController.getRatingsByCompanyId);
ratingRouter.post("/", authorize, RatingController.createRating);
ratingRouter.put("/:id", authorize, RatingController.updateRating);
ratingRouter.delete("/:id", authorize, RatingController.deleteRating);

export default ratingRouter;
