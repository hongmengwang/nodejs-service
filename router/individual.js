'use strict';

var server = require('../component/server');
var service = require('../service/individual');
var utils = require('../commons/utils');
var request = require('./request');

server.get({path: '/individuals', version: '1.0.0'}, function getIndividuals(req, res, next) {
  request.handleGet(req, res, next, service);
});
server.get({path: '/individuals/:id', version: '1.0.0'}, function getIndividualById(req, res, next) {
  request.handleGetById(req, res, next, service);
});
server.get({
  path: '/individuals/realname/:realname',
  version: '1.0.0'
}, function getIndividualByRealName(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetRealName() {
    service.getByRealName(req.params.realname, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.get({path: '/individuals/idno/:idno', version: '1.0.0'}, function getIndividualByIdNo(req, res, next) {
  request.handleRequest(req, res, next, function doHandleGetIdNo() {
    service.getByIdNo(req.params.idno, function (err, result) {
      if (err) {
        request.handleError(req, res, next, err);
      } else {
        res.send(utils.buildResponse(true, '获取成功', result));
      }
    });
  });
});
server.post({path: '/individuals', version: '1.0.0'}, function addIndividual(req, res, next) {
  request.handleAdd(req, res, next, service);
});
server.put({path: '/individuals', version: '1.0.0'}, function updateIndividual(req, res, next) {
  request.handleUpdate(req, res, next, service);
});
server.del({path: '/individuals/:id', version: '1.0.0'}, function deleteIndividual(req, res, next) {
  request.handleDelete(req, res, next, service);
});
