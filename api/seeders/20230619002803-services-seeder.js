'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const servicesData = [
      {
        name: 'Cabelo',
        price: '25,00',
        description: 'Escolha a melhor forma de cortar o seu cabelo, nossos profissionais estão preparados pra atender os seus pedidos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barba',
        price: '15,00',
        description: 'Sua barba feita da melhor forma possível, corte e desenho profissionais',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cabelo e Barba',
        price: '35,00',
        description: 'O pacote completo para você ficar no estilo, economize e saia daqui totalmente renovado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('services', servicesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', null, {});
  } 
};
