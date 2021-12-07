'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_subjects.init({
    semester_id: DataTypes.INTEGER,
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_subjects',
  });
  return m_subjects;
};