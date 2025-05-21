const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price_per_day: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
    image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
    availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  fuel_type: DataTypes.STRING,
  transmission: DataTypes.STRING,
  location: DataTypes.STRING,
  seats: DataTypes.INTEGER,
  rating: DataTypes.DECIMAL,
  matricule: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  kilometrage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reviews: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: () => Math.floor(Math.random() * 201) + 100
  }
}, {
  timestamps: true
});

  return Car;
};
