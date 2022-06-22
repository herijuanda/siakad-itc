'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_mentor.init({
    user_id: DataTypes.INTEGER,
    position: DataTypes.STRING,
    agency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_mentor',
  });
  return m_mentor;
};