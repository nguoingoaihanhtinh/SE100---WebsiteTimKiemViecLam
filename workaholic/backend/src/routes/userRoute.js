import express from "express";
import * as authController from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/login", authController.login);
userRouter.post("/logout", authController.logout);
userRouter.post("/register", authController.register);
userRouter.get("/checkjwt", authController.checkUserSession);

export default userRouter;
