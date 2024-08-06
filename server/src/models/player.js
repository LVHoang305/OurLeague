'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Player.belongsTo(models.Team, {foreignKey: 'team', targetKey: 'id', as: 'players'})
      //Player.hasOne(models.Team, {foreignKey: 'id', as: 'players'})
    }
  }
  Player.init({
    name: DataTypes.STRING,
    team: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    cap: DataTypes.TINYINT,
    number: DataTypes.INTEGER,
    birth: DataTypes.DATE,
    phone: DataTypes.STRING,
    identify: DataTypes.STRING,
    idenfron: DataTypes.STRING,
    idenback: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};