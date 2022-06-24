'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_lecturer.init({
    user_id: DataTypes.INTEGER,
    nip: DataTypes.STRING,
    position: DataTypes.STRING,
    last_education: DataTypes.STRING,
    year_of_entry: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'm_lecturer',
  });
  return m_lecturer;
};