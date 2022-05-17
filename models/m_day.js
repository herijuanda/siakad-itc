'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_day.init({
    english: DataTypes.STRING,
    indonesian: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_day',
  });
  return m_day;
};