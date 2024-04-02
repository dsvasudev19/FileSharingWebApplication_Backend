'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FolderTrash extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FolderTrash.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    ref: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FolderTrash',
  });
  return FolderTrash;
};