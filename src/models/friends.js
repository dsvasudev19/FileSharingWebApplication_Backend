'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friends.init({
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Friends',
  });
  return Friends;
};