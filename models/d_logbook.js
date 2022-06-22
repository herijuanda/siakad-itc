'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_logbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  d_logbook.init({
    mentoring_id: DataTypes.INTEGER,
    time_in: DataTypes.INTEGER,
    time_out: DataTypes.INTEGER,
    event: DataTypes.STRING,
    problem: DataTypes.STRING,
    file: DataTypes.STRING,
    note: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'd_logbook',
  });
  return d_logbook;
};