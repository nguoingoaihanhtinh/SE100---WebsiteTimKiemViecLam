import { Company, Job, JobType, Saved } from "../models/relation.js";

export const getSavedJobs = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { page = 1, limit = 10, order } = req.query;

    const offset = (page - 1) * limit;
    // Parse the order parameter
    let orderBy = [];
    if (order) {
      const isDescending = order.startsWith("-");
      const fieldName = isDescending ? order.slice(1) : order;

      // Ensure the field is valid to prevent SQL injection
      const validFields = ["title", "salary_from", "salary_to", "createdAt"];
      if (validFields.includes(fieldName)) {
        orderBy.push([{ model: Job, as: "job" }, fieldName, isDescending ? "DESC" : "ASC"]);
      }
    }
    const { rows: savedJobs, count: total } = await Saved.findAndCountAll({
      where: { user_id },
      include: [
        {
          model: Job,
          as: "job",
          attributes: [
            "id",
            "title",
            "description",
            "title",
            "position",
            "schedule",
            "experience",
            "salary_from",
            "salary_to",
            "createdAt",
          ],
          include: [
            {
              model: Company,
              as: "company",
              attributes: ["id", "name", "feild", "description", "img", "user_id", "address", "longitude", "lattidue"],
            },
            {
              model: JobType,
              as: "jobType",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: orderBy.length > 0 ? orderBy : undefined,
    });

    return res.status(200).json({
      message: "Saved jobs retrieved successfully",
      data: savedJobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
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
    const { id: job_id } = req.params;
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
