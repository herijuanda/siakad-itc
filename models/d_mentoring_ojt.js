'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_mentoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  d_mentoring.init({
    mentor_id: DataTypes.INTEGER,
    learner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'd_mentoring',
  });
  return d_mentoring;
};