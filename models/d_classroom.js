'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_classroom.init({
    code: DataTypes.STRING,
    school_year_id: DataTypes.INTEGER,
    study_program_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    classroom: DataTypes.STRING,
    actived: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'd_classroom',
  });
  return d_classroom;
};