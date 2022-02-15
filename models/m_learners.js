'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_learners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_learners.init({
    user_id: DataTypes.INTEGER,
    register_number: DataTypes.STRING,
    name: DataTypes.STRING,
    study_program_id: DataTypes.INTEGER,
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    gender_id: DataTypes.INTEGER,
    religion: DataTypes.STRING,
    address: DataTypes.TEXT,
    postal_code: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
    parent_name: DataTypes.STRING,
    parent_job: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_learners',
  });
  return m_learners;
};