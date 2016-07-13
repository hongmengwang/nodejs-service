'use strict';

var restify = require('restify');
var constants = require('../commons/constants');
var utils = require('../commons/utils');
var config = require('../config/env');
var logger = config.log;

var server = restify.createServer({
  name: config.server.name
});
server.listen(config.server.port, function () {
  logger.info('%s listening at %s', config.server.name, config.server.port);
});
server.pre(function (req, res, next) {
  if (req.getContentType() !== constants.JSON_TYPE) {
    return next(new restify.NotAcceptableError('请传入json请求'));
  }
  return next();
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser({mapParams: true}));
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true
}));
server.on('InternalServer', function (req, res, err, cb) {
  err.body = utils.buildResponse(false, constants.ERROR_MESSAGE);
  logger.error(err);
  return cb();
});
server.on('after', restify.auditLogger({log: logger, body: true}));

module.exports = server;
