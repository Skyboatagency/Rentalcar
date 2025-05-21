'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookings', 'locataire1', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'adresse1', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'cin1', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'permis1', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'locataire2', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'adresse2', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'cin2', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'permis2', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bookings', 'locataire1');
    await queryInterface.removeColumn('Bookings', 'adresse1');
    await queryInterface.removeColumn('Bookings', 'cin1');
    await queryInterface.removeColumn('Bookings', 'permis1');
    await queryInterface.removeColumn('Bookings', 'locataire2');
    await queryInterface.removeColumn('Bookings', 'adresse2');
    await queryInterface.removeColumn('Bookings', 'cin2');
    await queryInterface.removeColumn('Bookings', 'permis2');
  }
}; 