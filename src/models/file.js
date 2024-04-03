'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Folder,{foreignKey:'folderRef',as:'files'})
    }
  }
  File.init({
    folderRef: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    ref: DataTypes.STRING,
    file_name: DataTypes.STRING,
    original_name: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_size: DataTypes.STRING,
    url: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};