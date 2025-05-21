'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cars', 'rating', {
      type: Sequelize.DECIMAL(3,1),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cars', 'rating', {
      type: Sequelize.DECIMAL(10,0),
      allowNull: true
    });
  }
}; 