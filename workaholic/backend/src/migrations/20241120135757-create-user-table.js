"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM("User", "Employer", "Admin"),
        allowNull: false,
        defaultValue: "User",
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cv_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
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

    // Optional: Add email uniqueness constraint with a custom name
    await queryInterface.addConstraint("users", {
      type: "unique",
      fields: ["email"],
      name: "unique_email_constraint",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint first
    await queryInterface.removeConstraint("users", "unique_email_constraint");

    // Drop the table
    await queryInterface.dropTable("users");
  },
};
