'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Vérifier si les colonnes existent déjà
      const tableDescription = await queryInterface.describeTable('bookings');
      
      if (!tableDescription.locataire1) {
        await queryInterface.addColumn('bookings', 'locataire1', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.adresse1) {
        await queryInterface.addColumn('bookings', 'adresse1', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.cin1) {
        await queryInterface.addColumn('bookings', 'cin1', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.permis1) {
        await queryInterface.addColumn('bookings', 'permis1', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.locataire2) {
        await queryInterface.addColumn('bookings', 'locataire2', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.adresse2) {
        await queryInterface.addColumn('bookings', 'adresse2', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.cin2) {
        await queryInterface.addColumn('bookings', 'cin2', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableDescription.permis2) {
        await queryInterface.addColumn('bookings', 'permis2', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
    } catch (error) {
      console.error('Error in migration:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tableDescription = await queryInterface.describeTable('bookings');
      
      if (tableDescription.locataire1) {
        await queryInterface.removeColumn('bookings', 'locataire1');
      }
      
      if (tableDescription.adresse1) {
        await queryInterface.removeColumn('bookings', 'adresse1');
      }
      
      if (tableDescription.cin1) {
        await queryInterface.removeColumn('bookings', 'cin1');
      }
      
      if (tableDescription.permis1) {
        await queryInterface.removeColumn('bookings', 'permis1');
      }
      
      if (tableDescription.locataire2) {
        await queryInterface.removeColumn('bookings', 'locataire2');
      }
      
      if (tableDescription.adresse2) {
        await queryInterface.removeColumn('bookings', 'adresse2');
      }
      
      if (tableDescription.cin2) {
        await queryInterface.removeColumn('bookings', 'cin2');
      }
      
      if (tableDescription.permis2) {
        await queryInterface.removeColumn('bookings', 'permis2');
      }
    } catch (error) {
      console.error('Error in migration rollback:', error);
      throw error;
    }
  }
}; 