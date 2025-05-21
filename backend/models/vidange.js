const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Vidange = sequelize.define('Vidange', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  car_id: {
    type: DataTypes.INTEGER,
      allowNull: false
  },
  car_name: {
    type: DataTypes.STRING,
      allowNull: true
  },
  car_model: {
    type: DataTypes.STRING,
      allowNull: true
  },
    date: {
    type: DataTypes.DATE,
    allowNull: false
  },
    huile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    depart_km: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    prochain_km: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
  },
  filtre_huile_actuel: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_huile_prochain: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_gasoil_actuel: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_gasoil_prochain: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_air_actuel: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_air_prochain: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_habitacle_actuel: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  filtre_habitacle_prochain: {
    type: DataTypes.BOOLEAN,
      allowNull: true
  },
  plaquette_frein: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  disque_frein: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  pneus: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  radiateur: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  huile_boite_vitesse: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  huile_frein: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  kit_embrayage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  amortisseur_avant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  amortisseur_arriere: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
  }
}, {
  timestamps: true
});

  return Vidange;
}; 