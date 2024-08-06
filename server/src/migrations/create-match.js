'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamA: {
        type: Sequelize.INTEGER
      },
      teamB: {
        type: Sequelize.INTEGER
      },
      begin: {
        type: Sequelize.STRING
      },
      end: {
        type: Sequelize.STRING
      },
      goalA: {
        type: Sequelize.INTEGER
      },
      goalB: {
        type: Sequelize.INTEGER
      },
      redA: {
        type: Sequelize.INTEGER
      },
      redB: {
        type: Sequelize.INTEGER
      },
      yellowA: {
        type: Sequelize.INTEGER
      },
      yellowB: {
        type: Sequelize.INTEGER
      },
      reporter: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      intour: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  }
};