'use strict';

var Sequelize = require('sequelize');
var connection = require('../component/database').connection;
var individual = require('./individual');
var firm = require('./firm');

var business = connection.define('businesses', {
  individualId: {field: 'individual_id', type: Sequelize.INTEGER},
  firmId: {field: 'firm_id', type: Sequelize.INTEGER},
  bizType: {field: 'biz_type', type: Sequelize.STRING},
  bizFrom: {field: 'biz_from', type: Sequelize.STRING},
  createdAt: {field: 'created_at', type: Sequelize.DATE},
  updatedAt: {field: 'updated_at', type: Sequelize.DATE},
  createdBy: {field: 'created_by', type: Sequelize.STRING},
  updatedBy: {field: 'updated_by', type: Sequelize.STRING},
  version: {field: 'version', type: Sequelize.INTEGER}
});

business.belongsTo(individual, {foreignKey: 'individual_id', targetKey: 'id'});
business.belongsTo(firm, {foreignKey: 'firm_id', targetKey: 'id'});

module.exports = business;
