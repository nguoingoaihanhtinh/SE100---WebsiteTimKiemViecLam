"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ratings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      RatingValue: {
        type: Sequelize.DECIMAL(3, 2), // Example: values between 0.00 and 9.99
        allowNull: false,
      },
      Date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Adding foreign key constraints
    await queryInterface.addConstraint("ratings", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_rating_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("ratings", {
      fields: ["CompanyId"],
      type: "foreign key",
      name: "company_rating_fk",
      references: {
        table: "companies",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("ratings", "user_rating_fk");
    await queryInterface.removeConstraint("ratings", "company_rating_fk");
    await queryInterface.dropTable("ratings");
  },
};
