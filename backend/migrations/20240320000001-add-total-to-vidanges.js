'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('Vidanges', 'total', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   allowNull: true,
    //   defaultValue: 0.00
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Vidanges', 'total');
  }
}; 