'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_subject_quiz_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_subject_quiz_result.init({
    learner_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'd_subject_quiz_result',
  });
  return d_subject_quiz_result;
};