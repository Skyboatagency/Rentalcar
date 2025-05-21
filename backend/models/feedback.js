module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  });

  Feedback.associate = function(models) {
    Feedback.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User'
    });
    Feedback.belongsTo(models.Car, {
      foreignKey: 'car_id',
      as: 'Car'
    });
    Feedback.belongsTo(models.Booking, {
      foreignKey: 'booking_id',
      as: 'Booking'
    });
  };

  return Feedback;
}; 