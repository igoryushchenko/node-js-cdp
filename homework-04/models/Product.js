module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING
  }, {})
  Product.associate = function(models) {
    Product.hasMany(models.Review, { as: 'reviews', foreignKey: 'productId' })
  }
  return Product
}