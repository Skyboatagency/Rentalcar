'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Vidanges', 'prochaine');
    
    // await queryInterface.renameColumn('Vidanges', 'depart', 'date');
    
    // await queryInterface.addColumn('Vidanges', 'huile', {
    //   type: Sequelize.STRING,
    //   allowNull: true
    // });

    // await queryInterface.addColumn('Vidanges', 'depart_km', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   allowNull: true
    // });

    // await queryInterface.addColumn('Vidanges', 'prochain_km', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   allowNull: true
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Vidanges', 'huile');
    // await queryInterface.removeColumn('Vidanges', 'depart_km');
    // await queryInterface.removeColumn('Vidanges', 'prochain_km');
    
    await queryInterface.renameColumn('Vidanges', 'date', 'depart');
    
    // await queryInterface.addColumn('Vidanges', 'prochaine', {
    //   type: Sequelize.DATE,
    //   allowNull: true
    // });
  }
}; 