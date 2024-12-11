
import { Job, Saved } from "../models/relation.js";

export const getSavedJobs = async (req, res) => {
    try {
      const user_id = req.user.id; 
  
      const savedJobs = await Saved.findAll({
        where: { user_id },
        include: [
          {
            model: Job, 
            as: "job", 
            attributes: ["id", "title", "description"], 
          },
        ],
      });
  
      return res.status(200).json({
        message: "Saved jobs retrieved successfully",
        data: savedJobs,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve saved jobs",
        error: error.message,
      });
    }
  };

export const saveJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const user_id = req.user.id; 

    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadySaved = await Saved.findOne({ where: { user_id, job_id } });
    if (alreadySaved) {
      return res.status(400).json({ message: "Job already saved" });
    }

    const saved = await Saved.create({ user_id, job_id });
    return res.status(201).json({ message: "Job saved successfully", data: saved });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save job", error: error.message });
  }
};

export const removeSavedJob = async (req, res) => {
    try {
      const { id: job_id } = req.params; // Extract job_id from the route parameter
      const user_id = req.user.id;
  
      const saved = await Saved.findOne({ where: { user_id, job_id } });
      if (!saved) {
        return res.status(404).json({ message: "Saved job not found" });
      }
  
      await saved.destroy();
      return res.status(200).json({ message: "Saved job removed successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to remove saved job",
        error: error.message,
      });
    }
  };
  
  