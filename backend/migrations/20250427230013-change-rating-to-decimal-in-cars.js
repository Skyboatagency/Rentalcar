'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cars', 'rating', {
      type: Sequelize.DECIMAL,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cars', 'rating', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
