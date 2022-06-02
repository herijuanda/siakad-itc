'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_subject_module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_subject_module.init({
    lecturer_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'd_subject_module',
  });
  return d_subject_module;
};