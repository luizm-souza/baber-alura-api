'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('clients', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('clients', 'document', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('clients', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('clients', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('clients', 'phone', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
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
