'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sharedByYou',
        scope: {
          where: {
            senderId:
              models.User.id

          }
        }
      })
      this.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'sharedWithYou',
        scope: {
          where: {
            receiverId:
              models.User.id

          }
        }
      })
      
      this.belongsTo(models.File, {
        foreignKey: 'fileRef',
        as: 'file',
        constraints: false,
        targetKey:'ref'
      })
    }
  }
  Share.init({
    fileRef: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};