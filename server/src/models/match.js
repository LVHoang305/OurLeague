'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Team, {foreignKey: 'teamA', targetKey: 'id', as: 'TeamA'})
      Match.belongsTo(models.Team, {foreignKey: 'teamB', targetKey: 'id', as: 'TeamB'})
    }
  }
  Match.init({
    teamA: DataTypes.INTEGER,
    teamB: DataTypes.INTEGER,
    begin: DataTypes.STRING,
    end: DataTypes.STRING,
    goalA: DataTypes.INTEGER,
    goalB: DataTypes.INTEGER,
    redA: DataTypes.INTEGER,
    redB: DataTypes.INTEGER,
    yellowA: DataTypes.INTEGER,
    yellowB: DataTypes.INTEGER,
    reporter: DataTypes.INTEGER,
    date: DataTypes.DATE,
    intour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};