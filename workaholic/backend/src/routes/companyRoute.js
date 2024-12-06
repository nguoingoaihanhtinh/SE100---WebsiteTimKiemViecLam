import express from "express";
import * as CompanyController from "../controllers/companyController.js";

const companyRoute = express.Router();

companyRoute.get("/", CompanyController.getAllCompanies);
companyRoute.get("/getByUser/:user_id", CompanyController.getCompanyByUserId);
companyRoute.get("/:id", CompanyController.getCompanyById);

export default companyRoute;
