'use strict';

var server = require('../component/server');
var service = require('../service/firm');
var utils = require('../commons/utils');
var request = require('./request');

server.get({path: '/firms', version: '1.0.0'}, function getFirms(req, res, next) {
  request.handleGet(req, res, next, service);
});
server.get({path: '/firms/:id', version: '1.0.0'}, function getFirmById(req, res, next) {
  request.handleGetById(req, res, next, service);
});
server.get({
  path: '/firms/invididualid/:individualid',
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
server.get({path: '/firms/creditcode/:creditcode', version: '1.0.0'}, function getFirmByCreditCode(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetByCreditCode() {
    service.getByCreditCode(req.params.creditcode, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.get({
  path: '/firms/commercialorganization/:commercialcode/:organizationcode',
  version: '1.0.0'
}, function getFirmByCommercialOrganizationCode(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetByCommercialOrganizationCode() {
    service.getByCommercialOrganizationCode(req.params.commercialcode, req.params.organizationcode, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.post({path: '/firms', version: '1.0.0'}, function addFirm(req, res, next) {
  request.handleAdd(req, res, next, service);
});
server.put({path: '/firms', version: '1.0.0'}, function updateFirm(req, res, next) {
  request.handleUpdate(req, res, next, service);
});
server.del({path: '/firms/:id', version: '1.0.0'}, function deleteFirm(req, res, next) {
  request.handleDelete(req, res, next, service);
});