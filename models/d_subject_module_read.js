'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_subject_module_read extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_subject_module_read.init({
    module_id: DataTypes.INTEGER,
    learner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'd_subject_module_read',
  });
  return d_subject_module_read;
};