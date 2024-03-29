'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_student_record_sheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  d_student_record_sheet.init({
    classroom_id: DataTypes.INTEGER,
    // classroom_learner_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    learner_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    datetime: DataTypes.DATE,
    notes: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'd_student_record_sheet',
  });
  return d_student_record_sheet;
};