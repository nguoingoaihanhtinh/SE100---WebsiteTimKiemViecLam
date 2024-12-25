import { Rating, User } from "../models/relation.js";

export const getRatingsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const { rows: ratings, count: total } = await Rating.findAndCountAll({
      where: { UserId: userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          attributes: ["id", "user_name", "avatar"],
        },
      ],
    });

    return res.status(200).json({
      message: "Ratings retrieved successfully",
      data: ratings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve ratings",
      error: error.message,
    });
  }
};

export const getRatingsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const { rows: ratings, count: total } = await Rating.findAndCountAll({
      where: { CompanyId: companyId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          attributes: ["id", "user_name", "avatar"],
        },
      ],
    });

    return res.status(200).json({
      message: "Ratings retrieved successfully",
      data: ratings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve ratings",
      error: error.message,
    });
  }
};

export const createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { CompanyId, Content, RatingValue } = req.body;

    const newRating = await Rating.create({
      UserId: userId,
      CompanyId,
      Content,
      RatingValue,
    });

    return res.status(201).json({
      message: "Rating created successfully",
      data: newRating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create rating",
      error: error.message,
    });
  }
};

export const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { Content, RatingValue } = req.body;

    const rating = await Rating.findOne({ where: { id, UserId: userId } });
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    await rating.update({ Content, RatingValue });
    return res.status(200).json({
      message: "Rating updated successfully",
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update rating",
      error: error.message,
    });
  }
};

export const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findOne({ where: { id, UserId: userId } });
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    await rating.destroy();
    return res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete rating",
      error: error.message,
    });
  }
};
