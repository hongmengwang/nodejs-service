'use strict';

var Sequelize = require('sequelize');
var config = require('../config/env');
var logger = config.log;
var connection = new Sequelize(config.db.schema, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  pool: {
    max: config.db.maxSize,
    min: config.db.minSize,
    idle: config.db.idle
  },
  logging: function (message) {
    logger.info(message);
  }
});
connection.authenticate()
  .then(function () {
    logger.info('Connection has been established successfully.');
  })
  .catch(function (err) {
    logger.info('Unable to connect to the database:', err);
  });

var database = {
  connection: connection
};

module.exports = database;
