import express from "express";
import * as NotificationController from "../controllers/notificationController.js";

const notiRouter = express.Router();

// Define routes for notifications
notiRouter.get("/", NotificationController.getNotifications); // Retrieve all or filtered notifications
notiRouter.post("/", NotificationController.createNotification); // Create a new notification
notiRouter.patch("/:id", NotificationController.updateNotification); // Update a notification
notiRouter.delete("/:id", NotificationController.deleteNotification); // Delete a notification
notiRouter.get("/global", NotificationController.getGlobalNotifications); // Retrieve all global notifications

export default notiRouter;
