'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_learner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  m_learner.init({
    user_id: DataTypes.INTEGER,
    school_year_id: DataTypes.INTEGER,
    study_program_id: DataTypes.INTEGER,
    register_number: DataTypes.STRING,
    // name: DataTypes.STRING,
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
    modelName: 'm_learner',
  });
  return m_learner;
};