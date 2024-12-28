import { CV } from "../models/relation.js";

export const getCVs = async (req, res) => {
  try {
    const user_id = req.user.id;
    const cv = await CV.findOne({
      where: { user_id },
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found for this user",
      });
    }

    return res.status(200).json({
      message: "CV retrieved successfully",
      data: cv,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve CV",
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
export const getCVByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cvs = await CV.findAll({
      where: { user_id: userId },
    });

    if (cvs.length === 0) {
      return res.status(404).json({
        message: "No CVs found for this user",
      });
    }

    return res.status(200).json({
      message: "CVs retrieved successfully",
      data: cvs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve CVs",
      error: error.message,
    });
  }
};
