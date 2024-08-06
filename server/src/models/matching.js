'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matching extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Matching.belongsTo(models.Team, {foreignKey: 'team', targetKey: 'id', as: 'DetailTeam'})
    }
  }
  Matching.init({
    team: DataTypes.STRING,
    begin: DataTypes.STRING,
    end: DataTypes.STRING,
    location: DataTypes.INTEGER,
    date: DataTypes.DATE,
    rate: DataTypes.INTEGER,
    found: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Matching',
  });
  return Matching;
};