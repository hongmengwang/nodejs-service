'use strict';

var restify = require('restify');
var utils = require('../commons/utils');
var individual = require('../model/individual');

function checkAdd(model) {
  if (!model.realName) {
    return new restify.InvalidContentError('realName参数错误');
  }
  if (!utils.isValidIdType(model.idType)) {
    return new restify.InvalidContentError('idType参数错误');
  }
  if (!model.idNo) {
    return new restify.InvalidContentError('idNo参数错误');
  }
  if (!model.createdBy) {
    return new restify.InvalidContentError('createdBy参数错误');
  }
}

function checkUpdate(model) {
  if (!model.id) {
    return new restify.InvalidContentError('id参数错误');
  }
  if (!model.realName) {
    return new restify.InvalidContentError('realName参数错误');
  }
  if (!utils.isValidIdType(model.idType)) {
    return new restify.InvalidContentError('idType参数错误');
  }
  if (!model.idNo) {
    return new restify.InvalidContentError('idNo参数错误');
  }
  if (!model.updatedBy) {
    return new restify.InvalidContentError('updatedBy参数错误');
  }
  if (!model.version && model.version !== 0) {
    return new restify.InvalidContentError('version参数错误');
  }
}

var service = {
  get: function (callback) {
    individual.findAndCountAll().then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  getById: function (id, callback) {
    individual.findAndCountAll({
      where: {
        id: id
      }
    }).then(function (result) {
      var count = result.count;
      var rows = result.rows;
      var model = {};
      if (count) {
        model = rows[0].get({plain: true});
        utils.formatDateTime(model);
      }
      callback(null, model);
    });
  },
  getByIdNo: function (idNo, callback) {
    individual.findAndCountAll({
      where: {
        idNo: idNo
      }
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  getByRealName: function (realName, callback) {
    individual.findAndCountAll({
      where: {
        realName: {$like: '%' + realName + '%'}
      }
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  add: function (model, callback) {
    var err = checkAdd(model);
    if (err) {
      return callback(err);
    }

    individual.findOrCreate({
      where: {idNo: model.idNo},
      defaults: {
        realName: model.realName,
        idType: model.idType,
        idNo: model.idNo,
        idDuration: model.idDuration,
        sex: model.sex,
        birthDate: model.birthDate,
        address: model.address,
        createdBy: model.createdBy,
        updatedBy: model.createdBy
      }
    }).spread(function (result) {
      var model = result.get({plain: true});
      utils.formatDateTime(model);
      callback(null, model);
    });
  },
  update: function (model, callback) {
    var err = checkUpdate(model);
    if (err) {
      return callback(err);
    }

    individual.findAndCountAll({
      where: {
        id: {
          $ne: model.id
        },
        idNo: model.idNo
      }
    }).then(function (result) {
      var length = result.count;
      if (length) {
        return callback(new restify.ConflictError('身份证号码已存在'));
      }
      individual.update({
        realName: model.realName,
        idType: model.idType,
        idNo: model.idNo,
        idDuration: model.idDuration,
        sex: model.sex,
        birthDate: model.birthDate,
        address: model.address,
        updatedBy: model.updatedBy,
        updateAt: utils.now(),
        version: model.version + 1
      }, {
        where: {
          id: model.id,
          version: model.version
        }
      }).spread(function (result) {
        callback(null, result);
      });
    });
  },
  del: function (id, callback) {
    individual.destroy({
      where: {
        id: id
      }
    }).then(function (result) {
      callback(null, result);
    });
  }
};

module.exports = service;
