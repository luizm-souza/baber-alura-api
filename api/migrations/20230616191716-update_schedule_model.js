'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('schedules', 'scheduleTime', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
    queryInterface.changeColumn('schedules', 'clientId', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
    queryInterface.changeColumn('schedules', 'barberId', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
    queryInterface.changeColumn('schedules', 'serviceId', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
