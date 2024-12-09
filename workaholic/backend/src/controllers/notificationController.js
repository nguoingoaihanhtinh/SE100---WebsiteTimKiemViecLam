import { Notification } from "../models/relation.js";



/**
 * Create a new notification
 */
export const createNotification = async (req, res) => {
  const { header, content, user_id, is_global, date } = req.body;

  try {
    const notification = await Notification.create({
      header,
      content,
      user_id: user_id || null, // If no user_id, it's a global notification
      is_global: is_global || false,
      date,
    });

    res.status(201).json({ message: "Notification created successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Failed to create notification", error: error.message });
  }
};

/**
 * Get all notifications (global or user-specific based on query)
 */
export const getNotifications = async (req, res) => {
  const { user_id, is_global } = req.query;

  try {
    const whereClause = {};

    if (user_id) whereClause.user_id = user_id;
    if (is_global) whereClause.is_global = is_global === "true";

    const notifications = await Notification.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve notifications", error: error.message });
  }
};

/**
 * Get a single notification by ID
 */
export const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve notification", error: error.message });
  }
};

/**
 * Update a notification
 */
export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { header, content, user_id, is_global, date } = req.body;

  try {
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.update({
      header,
      content,
      user_id,
      is_global,
      date,
    });

    res.status(200).json({ message: "Notification updated successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification", error: error.message });
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.destroy();

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notification", error: error.message });
  }
};

/**
 * Get global notifications
 */
export const getGlobalNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { is_global: true },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve global notifications", error: error.message });
  }
};
