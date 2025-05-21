module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    phone: DataTypes.STRING,               // Nouveau champ "phone"
    resetCode: DataTypes.STRING,           // Pour stocker le code de réinitialisation
    resetCodeExpiration: DataTypes.DATE    // Pour stocker l'expiration du code
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Booking, { foreignKey: 'user_id' });
    User.hasMany(models.Review, { foreignKey: 'user_id' });
  };

  return User;
};
