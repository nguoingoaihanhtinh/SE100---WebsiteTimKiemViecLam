import sequelize from "../config/database.js";
import { Application, Job, User, Notification, Company } from "../models/relation.js";

// Create an application
export const createApplication = async (req, res) => {
  const transaction = await sequelize.transaction(); // Begin a transaction for atomicity
  try {
    const { user_id, job_id, status } = req.body;

    // Validate User (applicant)
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate Job
    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Validate Company
    const company = await Company.findByPk(job.company_id);
    if (!company || !company.user_id) {
      return res.status(404).json({ error: "Company or employer not found" });
    }

    // Create Application
    const application = await Application.create({ user_id, job_id, status }, { transaction });

    // Notification for the user (applicant)
    await Notification.create(
      {
        header: "Application Submitted",
        content: `Your application for Job ID ${job_id} has been submitted.`,
        user_id,
        is_global: false,
        date: new Date().toISOString(),
      },
      { transaction }
    );

    // Notification for the employer
    await Notification.create(
      {
        header: "New Application Received",
        content: `A new application has been submitted for Job ID ${job_id}.`,
        user_id: company.user_id,
        is_global: false,
        date: new Date().toISOString(),
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json(application);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApplication = async (req, res) => {
  const transaction = await sequelize.transaction(); // Begin a transaction for atomicity
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const { user_id, job_id } = application;
    const updatedStatus = req.body.status;

    //JobSeeker
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    const company = await Company.findByPk(job.company_id);
    if (!company || !company.user_id) {
      return res.status(404).json({ error: "Company or employer not found" });
    }

    await application.update({ status: updatedStatus }, { transaction });

    // Notification for the user (applicant)
    await Notification.create(
      {
        header: "Application Status Updated",
        content: `Your application for Job ID ${job_id} has been updated to ${updatedStatus}.`,
        user_id,
        is_global: false,
        date: new Date().toISOString(),
      },
      { transaction }
    );

    // Notification for the employer
    await Notification.create(
      {
        header: "Application Update Confirmation",
        content: `You have updated the status of the application for Job ID ${job_id}. The new status is ${updatedStatus}.`,
        user_id: company.user_id,
        is_global: false,
        date: new Date().toISOString(),
      },
      { transaction }
    );

    await transaction.commit();

    res.status(200).json(application);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    await application.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applications by Job ID with user object
export const getApplicationsByJobId = async (req, res) => {
  try {
    const { page = 1, limit = 10, order = "desc" } = req.query;
    const jobId = req.params.jobId;
    const offset = (page - 1) * limit;

    const applications = await Application.findAndCountAll({
      where: { job_id: jobId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "user_name", "email", "avatar"],
        },
        {
          model: Job,
          as: "job",
          attributes: ["id", "title"],
        },
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["updatedAt", order.toUpperCase()]],
    });

    if (!applications.rows.length) {
      return res.status(404).json({ error: "No applications found for this job" });
    }

    const totalPages = Math.ceil(applications.count / limit);
    res.status(200).json({
      data: applications.rows,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
        totalApplications: applications.count,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, order = "desc" } = req.query;
    const userId = req.user.id;
    const offset = (page - 1) * limit;

    const applications = await Application.findAndCountAll({
      where: { user_id: userId },
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "salary_from"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "user_name", "email"],
        },
      ],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["updatedAt", order.toUpperCase()]],
    });

    if (!applications.rows.length) {
      return res.status(404).json({ message: "No applications found for this user" });
    }

    const totalPages = Math.ceil(applications.count / limit);
    res.status(200).json({
      data: applications.rows,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
        totalApplications: applications.count,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
