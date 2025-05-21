'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,  // ou false si vous souhaitez que ce champ soit obligatoire
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'phone');
  }
};
