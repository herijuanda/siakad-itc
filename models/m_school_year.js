'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_school_year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_school_year.init({
    year: DataTypes.STRING,
    aktif: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'm_school_year',
  });
  return m_school_year;
};