'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jointour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jointour.belongsTo(models.Team, {foreignKey: 'teamid', targetKey: 'id', as: 'team'})
    }
  }
  jointour.init({
    teamid: DataTypes.INTEGER,
    tourid: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jointour',
  });
  return jointour;
};