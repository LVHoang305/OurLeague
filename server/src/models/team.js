'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, {foreignKey: 'owner', targetKey: 'id', as: 'ownerdetail'})
      Team.hasMany(models.jointour, {foreignKey: 'teamid', as: 'team'})
      Team.hasMany(models.Match, {foreignKey: 'teamA', as: 'TeamA'})
      Team.hasMany(models.Match, {foreignKey: 'teamB', as: 'TeamB'})
      Team.hasMany(models.Matching, {foreignKey: 'team', as: 'DetailTeam'})
      //Team.belongsToMany(models.Tournament, { through: 'JoinTour' })
      //Team.belongsTo(models.Player, {foreignKey: 'id', targetKey: 'team', as: 'players'})
      //Team.hasMany(models.Player, {foreignKey: 'team', as: 'players'})
    }
  }
  Team.init({
    name: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    subowner: DataTypes.INTEGER,
    coach: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    uniform: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};