'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Share,{
        foreignKey:'senderId',
        as:'sharesSent'
      })
      this.hasMany(models.Share,{
        foreignKey:'receiverId',
        as:'sharesReceived',
      })
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};