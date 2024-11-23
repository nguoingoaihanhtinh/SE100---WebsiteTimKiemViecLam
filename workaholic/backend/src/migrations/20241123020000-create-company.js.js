"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("company", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value for the number of available jobs
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("company");
  },
};
