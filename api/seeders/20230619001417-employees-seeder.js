'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employeesData = [
      {
        name: 'João Gomes',
        document: '12345678901',
        email: 'joao.g@example.com',
        password: 'password1',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        document: '23456789012',
        email: 'janesmith@example.com',
        password: 'password2',
        phone: '2345678901',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michael Johnson',
        document: '34567890123',
        email: 'michaeljohnson@example.com',
        password: 'password3',
        phone: '3456789012',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Davis',
        document: '45678901234',
        email: 'emilydavis@example.com',
        password: 'password4',
        phone: '4567890123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Daniel Brown',
        document: '56789012345',
        email: 'danielbrown@example.com',
        password: 'password5',
        phone: '5678901234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('employees', employeesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
  } 
};
