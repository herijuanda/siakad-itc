'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_learner_value extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_learner_value.init({
    classroom_id: DataTypes.INTEGER,
    classroom_learner_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    lecturer_id: DataTypes.INTEGER,
    learner_id: DataTypes.INTEGER,
    absen: DataTypes.INTEGER,
    tugas: DataTypes.INTEGER,
    midterm: DataTypes.INTEGER,
    sikap: DataTypes.INTEGER,
    final: DataTypes.INTEGER,
    kuis: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'd_learner_value',
  });
  return d_learner_value;
};