module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Product, {foreignKey: 'productId'})
  };
  return Review;
};