import { User, JobType, Job } from "../models/relation.js";
import { Op, Sequelize } from "sequelize";

export const getMonthlyUserStats = async (req, res) => {
  try {
    // Extract year from query parameters, default to the current year if not provided
    const year = parseInt(req.query.year) || new Date().getFullYear();

    // Start and end dates for the year
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31 23:59:59`);

    // Query to group by month and count users
    const userStats = await User.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "userCount"],
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ["month"],
      order: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "ASC"]],
    });

    // Format the query results into a dictionary for easy lookup
    const statsMap = userStats.reduce((acc, stat) => {
      acc[stat.getDataValue("month")] = parseInt(stat.getDataValue("userCount"), 10);
      return acc;
    }, {});

    // Generate a complete list of months (1 to 12) with default userCount = 0
    const completeStats = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1; // Month number (1-based index)
      return {
        month,
        userCount: statsMap[month] || 0, // Use the value from statsMap or default to 0
      };
    });

    return res.status(200).json({
      message: "Monthly user stats retrieved successfully",
      data: completeStats,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve monthly user stats",
      error: error.message,
    });
  }
};
export const getJobTypeCountStats = async (req, res) => {
  try {
    // Query to count the number of jobs for each job type
    const jobTypeCounts = await Job.findAll({
      attributes: [
        "jobType_id", // Group by jobType_id
        [Sequelize.fn("COUNT", Sequelize.col("jobType_id")), "jobCount"], // Count the jobs for each jobType
      ],
      group: ["jobType_id"], // Group by jobType_id
      include: [
        {
          model: JobType,
          as: "jobType",
          attributes: ["id", "name"], // Include job type name
        },
      ],
      raw: true, // Return plain data
    });

    // Format the result to include job type names
    const result = jobTypeCounts.map((item) => ({
      jobTypeId: item["jobType_id"],
      jobTypeName: item["jobType.name"], // Access the job type name from the included model
      jobCount: item.jobCount,
    }));

    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve job type count stats",
      error: error.message,
    });
  }
};
