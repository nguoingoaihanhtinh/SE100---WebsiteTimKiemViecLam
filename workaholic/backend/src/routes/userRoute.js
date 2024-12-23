import express from "express";
import * as authController from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/login", authController.login);
userRouter.post("/logout", authController.logout);
userRouter.post("/register", authController.register);
userRouter.get("/checkjwt", authController.checkUserSession);
userRouter.get("/", authController.getAllUsers);
userRouter.get("/:id", authController.getUserById);
userRouter.put("/:id", authController.updateUser);
userRouter.delete("/:id", authController.deleteUser);

export default userRouter;
