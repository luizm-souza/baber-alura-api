'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('schedules', {
      fields: ['clientId'],
      type: 'foreign key',
      name: 'fk_schedule_client',
      references: {
        table: 'clients',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('schedules', {
      fields: ['barberId'],
      type: 'foreign key',
      name: 'fk_schedule_barber',
      references: {
        table: 'employees',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('schedules', {
      fields: ['serviceId'],
      type: 'foreign key',
      name: 'fk_schedule_service',
      references: {
        table: 'services',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('schedules', 'fk_schedule_client');
    await queryInterface.removeConstraint('schedules', 'fk_schedule_barber');
    await queryInterface.removeConstraint('schedules', 'fk_schedule_service');
  }
};
