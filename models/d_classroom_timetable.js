'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_classroom_timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_classroom_timetable.init({
    classroom_id: DataTypes.INTEGER,
    timetable: DataTypes.DATE,
    room: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'd_classroom_timetable',
  });
  return d_classroom_timetable;
};