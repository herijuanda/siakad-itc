'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gtk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Gtk.init({
    full_name: DataTypes.STRING,
    front_title: DataTypes.STRING,
    back_title: DataTypes.STRING,
    birth_date: DataTypes.STRING,
    birth_place: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    institution_id: DataTypes.INTEGER,
    integration_id: DataTypes.INTEGER,
    last_career_institution_id: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER,
    m_blood_type: DataTypes.STRING,
    m_blood_type_id: DataTypes.INTEGER,
    m_employee_status_id: DataTypes.INTEGER,
    m_gender_id: DataTypes.INTEGER,
    m_interval_time_id: DataTypes.INTEGER,
    m_marital_status_id: DataTypes.INTEGER,
    m_personnel_status_id: DataTypes.INTEGER,
    m_personnel_type_id: DataTypes.INTEGER,
    m_province_id: DataTypes.INTEGER,
    m_religion_id: DataTypes.INTEGER,
    m_residence_distance_id: DataTypes.INTEGER,
    m_residence_status_id: DataTypes.INTEGER,
    m_status_dukcapil: DataTypes.STRING,
    m_subdistrict_id: DataTypes.INTEGER,
    m_task_city_id: DataTypes.INTEGER,
    m_transportation_id: DataTypes.INTEGER,
    mobile_num: DataTypes.STRING,
    mother_full_name: DataTypes.STRING,
    nik: DataTypes.STRING,
    nip: DataTypes.STRING,
    npk: DataTypes.STRING,
    npsn: DataTypes.STRING,
    number_of_children: DataTypes.INTEGER,
    nuptk: DataTypes.STRING,
    pai_career_id: DataTypes.INTEGER,
    personnel_career_id: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    postal_code_num: DataTypes.INTEGER,
    public_school_id: DataTypes.INTEGER,
    pusdatin_sync_date: DataTypes.DATE,
    rejected_reason: DataTypes.STRING,
    spouse_name: DataTypes.STRING,
    start_working_date: DataTypes.DATE,
    teaching_hours_in_one_week: DataTypes.STRING,
    teaching_hours_in_one_week_non_satminkal: DataTypes.STRING,
    total_jtm: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    created_by: DataTypes.INTEGER,
    update_at: DataTypes.DATE,
    update_by: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Gtk',
  });
  return Gtk;
};