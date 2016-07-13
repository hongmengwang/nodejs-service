'use strict';

var constants = require('../commons/constants');
var utils = require('../commons/utils');
var logger = require('../config/env').log;

var request = {
  handleGet: function (req, res, next, service) {
    this.handleRequest(req, res, next, function doHandleGet() {
      service.get(function (err, result) {
        if (err) {
          request.handleError(req, res, next, err);
        } else {
          res.send(utils.buildResponse(true, '获取成功', result));
        }
      });
    });
  },
  handleGetById: function (req, res, next, service) {
    this.handleRequest(req, res, next, function doHandleGetById() {
      service.getById(req.params.id, function (err, result) {
        if (err) {
          request.handleError(req, res, next, err);
        } else {
          res.send(utils.buildResponse(true, '获取成功', result));
        }
      });
    });
  },
  handleAdd: function (req, res, next, service) {
    this.handleRequest(req, res, next, function doHandleAdd() {
      service.add(req.params, function (err, result) {
        if (err) {
          request.handleError(req, res, next, err);
        } else {
          res.send(utils.buildResponse(true, '添加成功', result));
        }
      });
    });
  },
  handleUpdate: function (req, res, next, service) {
    this.handleRequest(req, res, next, function doHandleUpdate() {
      service.update(req.params, function (err, result) {
        if (err) {
          request.handleError(req, res, next, err);
        } else if (result) {
          res.send(utils.buildResponse(true, '更新成功', result));
        } else {
          res.send(utils.buildResponse(false, '更新失败', result));
        }
      });
    });
  },
  handleDelete: function (req, res, next, service) {
    this.handleRequest(req, res, next, function doHandleDelete() {
      service.del(req.params.id, function (err, result) {
        if (err) {
          request.handleError(req, res, next, err);
        } else if (result) {
          res.send(utils.buildResponse(true, '删除成功', result));
        } else {
          res.send(utils.buildResponse(false, '删除失败', result));
        }
      });
    });
  },
  handleRequest: function (req, res, next, doHandle) {
    try {
      doHandle();
    } catch (err) {
      logger.error(err);
      res.statusCode = 500;
      res.send(utils.buildResponse(false, constants.ERROR_MESSAGE));
    }
    next();
  },
  handleError: function (req, res, next, err) {
    res.statusCode = err.statusCode;
    res.send(utils.buildResponse(false, err.message));
    next();
  }
};

module.exports = request;