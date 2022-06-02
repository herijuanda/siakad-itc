'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_subject_quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_subject_quiz.init({
    lecturer_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    question: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'd_subject_quiz',
  });
  return d_subject_quiz;
};