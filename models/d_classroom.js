'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_timetable.init({
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
    modelName: 'd_timetable',
  });
  return d_timetable;
};