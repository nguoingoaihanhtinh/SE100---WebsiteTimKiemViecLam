import express from "express";
import * as NotificationController from "../controllers/notificationController.js";
import { authorize } from "../middleware/authenticate.js";

const notiRouter = express.Router();

notiRouter.get("/", NotificationController.getNotifications);
notiRouter.get("/user/:userId", authorize, NotificationController.getNotificationsByUserId);
notiRouter.post("/", NotificationController.createNotification);
notiRouter.patch("/:id", NotificationController.updateNotification);
notiRouter.delete("/:id", NotificationController.deleteNotification);
notiRouter.get("/global", NotificationController.getGlobalNotifications);

export default notiRouter;
