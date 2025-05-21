'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Créer l'admin par défaut
    const hashedPassword = await bcrypt.hash('diab1234', 10);
    await queryInterface.bulkInsert('Admins', [{
      nom: 'diab',
      prenom: 'System',
      nomLocation: 'Location Principale',
      adresse: '123 Rue Admin',
      telephone: '0123456789',
      email: 'admin@system.com',
      ville: 'Paris',
      password: hashedPassword,
      isVerified: true,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer l'admin par défaut
    await queryInterface.bulkDelete('Admins', {
      email: 'admin@system.com'
    });

    // Supprimer la contrainte
    // await queryInterface.removeConstraint('Admins', 'unique_admin_role');
  }
}; 