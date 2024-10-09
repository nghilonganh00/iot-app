'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datasensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Datasensor.init({
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.INTEGER,
    light: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Datasensor',
  });
  return Datasensor;
};