'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_classroom_learner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_classroom_learner.init({
    classroom_id: DataTypes.INTEGER,
    learner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'd_classroom_learner',
  });
  return d_classroom_learner;
};