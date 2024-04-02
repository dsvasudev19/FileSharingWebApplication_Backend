'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.File, {foreignKey: 'folderRef', as: 'files', constraints: false, sourceKey: 'ref', })
      this.belongsTo(models.User, {foreignKey: 'userId',as: 'user'})


    }
  }
  Folder.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    ref: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};