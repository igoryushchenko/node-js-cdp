module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })
  User.prototype.toJSON = function () {
      return { firstName: this.firstName, lastName: this.lastName, email: this.email }
  }
  return User
}
