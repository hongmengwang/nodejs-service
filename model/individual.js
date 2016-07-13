'use strict';

var Sequelize = require('sequelize');
var connection = require('../component/database').connection;

module.exports = connection.define('individuals', {
  realName: {field: 'real_name', type: Sequelize.STRING},
  idType: {field: 'id_type', type: Sequelize.STRING},
  idNo: {field: 'id_no', type: Sequelize.STRING, unique: true},
  idDuration: {field: 'id_duration', type: Sequelize.STRING},
  sex: {field: 'sex', type: Sequelize.STRING},
  birthDate: {field: 'birth_date', type: Sequelize.DATE},
  address: {field: 'address', type: Sequelize.STRING},
  createdAt: {field: 'created_at', type: Sequelize.DATE},
  updatedAt: {field: 'updated_at', type: Sequelize.DATE},
  createdBy: {field: 'created_by', type: Sequelize.STRING},
  updatedBy: {field: 'updated_by', type: Sequelize.STRING},
  version: {field: 'version', type: Sequelize.INTEGER}
});
