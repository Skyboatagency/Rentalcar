'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'user_id' });
      Booking.belongsTo(models.Car, { foreignKey: 'car_id' });
      Booking.hasOne(models.Feedback, { foreignKey: 'booking_id', as: 'Feedback' });
    }
  }
  
  Booking.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    locataire1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cin1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    permis1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locataire2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cin2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    permis2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'completed', 'cancelled'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
  });
  
  return Booking;
};
