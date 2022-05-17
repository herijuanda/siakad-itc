'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_payment.init({
    learner_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    datetime: DataTypes.DATE,
    description: DataTypes.TEXT,
    file_payment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'd_payment',
  });
  return d_payment;
};