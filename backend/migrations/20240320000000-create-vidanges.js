'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vidanges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cars',
          key: 'id'
        }
      },
      car_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      car_model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      depart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      prochaine: {
        type: Sequelize.DATE,
        allowNull: false
      },
      filtre_huile_actuel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_huile_prochain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_gasoil_actuel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_gasoil_prochain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_air_actuel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_air_prochain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_habitacle_actuel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filtre_habitacle_prochain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      plaquette_frein: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      disque_frein: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      pneus: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      radiateur: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      huile_boite_vitesse: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      huile_frein: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      kit_embrayage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      amortisseur_avant: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      amortisseur_arriere: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vidanges');
  }
}; 