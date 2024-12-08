"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "is_read", "is_accepted", "rejected"),
        defaultValue: "pending",
      },
      date_applied: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      letter: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("applications", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_applications_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("applications", {
      fields: ["job_id"],
      type: "foreign key",
      name: "job_applications_fk",
      references: {
        table: "jobs",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("applications", "user_applications_fk");
    await queryInterface.removeConstraint("applications", "job_applications_fk");
    await queryInterface.dropTable("applications");
  },
};
