'use strict';

var server = require('../component/server');
var service = require('../service/business');
var utils = require('../commons/utils');
var request = require('./request');

server.get({path: '/businesses', version: '1.0.0'}, function getFirms(req, res, next) {
  request.handleGet(req, res, next, service);
});
server.get({path: '/businesses/:id', version: '1.0.0'}, function getFirmById(req, res, next) {
  request.handleGetById(req, res, next, service);
});
server.get({
  path: '/businesses/individualid/:individualid',
  version: '1.0.0'
}, function getFirmByIndividualId(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetByIndividualId() {
    service.getByIndividualId(req.params.individualid, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.get({path: '/businesses/firmid/:firmid', version: '1.0.0'}, function getFirmByFirmId(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetByFirmId() {
    service.getByFirmId(req.params.firmid, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.get({path: '/businesses/biztype/:biztype', version: '1.0.0'}, function getFirmByBizType(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetByBizType() {
    service.getByBizType(req.params.biztype, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.get({path: '/businesses/bizfrom/:bizfrom', version: '1.0.0'}, function getFirmByBizFrom(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetByBizFrom() {
    service.getByBizFrom(req.params.bizfrom, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.post({path: '/businesses', version: '1.0.0'}, function addFirm(req, res, next) {
  request.handleAdd(req, res, next, service);
});
server.put({path: '/businesses', version: '1.0.0'}, function updateFirm(req, res, next) {
  request.handleUpdate(req, res, next, service);
});
server.del({path: '/businesses/:id', version: '1.0.0'}, function deleteFirm(req, res, next) {
  request.handleDelete(req, res, next, service);
});