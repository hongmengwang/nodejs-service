'use strict';

var Sequelize = require('sequelize');
var connection = require('../component/database').connection;
var individual = require('./individual');

var firm = connection.define('firms', {
  individualId: {field: 'individual_id', type: Sequelize.INTEGER},
  name: {field: 'name', type: Sequelize.STRING},
  type: {field: 'type', type: Sequelize.STRING},
  creditCode: {field: 'credit_code', type: Sequelize.STRING, unique: true},
  commercialCode: {
    field: 'commercial_code',
    type: Sequelize.STRING,
    unique: 'firms_commercial_code_organization_code_index'
  },
  organizationCode: {
    field: 'organization_code',
    type: Sequelize.STRING,
    unique: 'firms_commercial_code_organization_code_index'
  },
  contactPerson: {field: 'contact_person', type: Sequelize.STRING},
  contactPersonPhone: {field: 'contact_person_phone', type: Sequelize.STRING},
  address: {field: 'address', type: Sequelize.STRING},
  createdAt: {field: 'created_at', type: Sequelize.DATE},
  updatedAt: {field: 'updated_at', type: Sequelize.DATE},
  createdBy: {field: 'created_by', type: Sequelize.STRING},
  updatedBy: {field: 'updated_by', type: Sequelize.STRING},
  version: {field: 'version', type: Sequelize.INTEGER}
});

firm.belongsTo(individual, {foreignKey: 'individual_id', targetKey: 'id'});

module.exports = firm;
