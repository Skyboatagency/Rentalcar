module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Rental.associate = (models) => {
    // Define relationships if needed, e.g.:
    // Rental.hasMany(models.Booking);
  };

  return Rental;
};
