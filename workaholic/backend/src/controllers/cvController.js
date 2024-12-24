import { CV } from "../models/relation.js";

export const getCVs = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const { rows: cvs, count: total } = await CV.findAndCountAll({
      where: { user_id },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      message: "CVs retrieved successfully",
      data: cvs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve CVs",
      error: error.message,
    });
  }
};

export const createCV = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, summary, skills, experience, education, certifications } = req.body;

    const newCV = await CV.create({
      user_id,
      title,
      summary,
      skills,
      experience,
      education,
      certifications,
    });

    return res.status(201).json({
      message: "CV created successfully",
      data: newCV,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create CV",
      error: error.message,
    });
  }
};

export const updateCV = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { title, summary, skills, experience, education, certifications } = req.body;

    const cv = await CV.findOne({ where: { id, user_id } });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    await cv.update({ title, summary, skills, experience, education, certifications });
    return res.status(200).json({ message: "CV updated successfully", data: cv });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update CV",
      error: error.message,
    });
  }
};

export const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const cv = await CV.findOne({ where: { id, user_id } });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    await cv.destroy();
    return res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete CV",
      error: error.message,
    });
  }
};
