"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      number_rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      experience: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      schedule: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valid_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expired_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jobType_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Adding relationships (many-to-many and one-to-many)
    await queryInterface.addConstraint("jobs", {
      fields: ["jobType_id"],
      type: "foreign key",
      name: "jobs_jobType_fk",
      references: {
        table: "jobTypes",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("jobs", {
      fields: ["company_id"],
      type: "foreign key",
      name: "jobs_company_fk",
      references: {
        table: "companys",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the foreign key constraints
    await queryInterface.removeConstraint("jobs", "jobs_jobType_fk");
    await queryInterface.removeConstraint("jobs", "jobs_company_fk");

    // Drop the "jobs" table
    await queryInterface.dropTable("jobs");
  },
};