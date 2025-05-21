module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {});
  
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'user_id' });
    Review.belongsTo(models.Car, { foreignKey: 'car_id' });
  };

  return Review;
};
