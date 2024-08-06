'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model { 
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tournament.belongsTo(models.Location, {foreignKey: 'location', targetKey: 'id', as: 'tlocation' })
      Tournament.belongsTo(models.User, {foreignKey: 'staff', targetKey: 'id', as: 'staffdetail'})
      //Tournament.belongsToMany(models.Team, {through: 'JoinTour' })
    }
  }
  Tournament.init({
    name: DataTypes.STRING,
    staff: DataTypes.INTEGER,
    substaff: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    location: DataTypes.INTEGER,
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    maxteam: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    turn: DataTypes.INTEGER,
    roundtime: DataTypes.INTEGER,
    round: DataTypes.INTEGER,
    players: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};