'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_subject_lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_subject_lecturer.init({
    school_year_id: DataTypes.INTEGER,
    semester_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    classroom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'd_subject_lecturer',
  });
  return d_subject_lecturer;
};