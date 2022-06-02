'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_subject_quiz_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_subject_quiz_answer.init({
    quiz_id: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'd_subject_quiz_answer',
  });
  return d_subject_quiz_answer;
};