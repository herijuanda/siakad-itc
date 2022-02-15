'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_study_program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_study_program.init({
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'm_study_program',
  });
  return m_study_program;
};