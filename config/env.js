'use strict';

var nconf = require('nconf').argv().env();
var profiles = nconf.get('profiles') || 'dev';
var logPath = nconf.get('logPath');
var port = nconf.get('port') || 8080;
var bunyan = require('bunyan');
var config;

if (profiles === 'prod') {
  config = require('./env-prod.json');
  config.log = bunyan.createLogger({
    name: 'commons-source-log',
    streams: [{
      type: 'rotating-file',
      path: logPath,
      period: '1d',
      count: 30
    }]
  });
} else if (profiles === 'uat') {
  config = require('./env-uat.json');
  config.log = bunyan.createLogger({
    name: 'commons-source-log',
    streams: [{
      type: 'rotating-file',
      path: logPath,
      period: '1d',
      count: 30
    }]
  });
} else if (profiles === 'test') {
  config = require('./env-test.json');
  config.log = bunyan.createLogger({
    name: 'commons-source-log',
    streams: [{
      type: 'rotating-file',
      path: logPath,
      period: '1d',
      count: 30
    }]
  });
} else {
  config = require('./env-dev.json');
  config.log = bunyan.createLogger({
    name: 'commons-source-log',
    stream: process.stdout,
    level: 'debug',
    serializers: bunyan.stdSerializers
  });
}

config.server = {
  name: 'commons-source',
  port: port
};

module.exports = config;
