import {Application, Job, User} from "../models/relation.js";


// Create an application
export const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
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

// Update an application
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    await application.update(req.body);
    res.status(200).json(application);
  } catch (error) {
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
    const jobId = req.params.jobId;
    const applications = await Application.findAll({
      where: { job_id: jobId },
      include: [
        { 
          model: User, 
          as: 'user', 
          attributes: ['id', 'user_name', 'email', 'avatar'],
        },
        {
          model: Job,
          as: 'job', 
          attributes: ['id', 'title'], 
        }],
    });

    if (!applications.length) {
      return res.status(404).json({ error: "No applications found for this job" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
