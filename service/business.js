'use strict';

var restify = require('restify');
var utils = require('../commons/utils');
var business = require('../model/business');
var individual = require('../model/individual');
var firm = require('../model/firm');
var individualService = require('./individual');
var firmService = require('./firm');

function checkAdd(model) {
  if (!model.individualId && !model.firmId) {
    return new restify.InvalidContentError('individualId/firmId参数错误');
  }
  if (!utils.isValidBizType(model.bizType)) {
    return new restify.InvalidContentError('bizType参数错误');
  }
  if (!utils.isValidBizType(model.bizFrom)) {
    return new restify.InvalidContentError('bizFrom参数错误');
  }
  if (!model.createdBy) {
    return new restify.InvalidContentError('createdBy参数错误');
  }
}

function checkUpdate(model) {
  if (!model.id) {
    return new restify.InvalidContentError('id参数错误');
  }
  if (!model.individualId && !model.firmId) {
    return new restify.InvalidContentError('individualId/firmId参数错误');
  }
  if (!utils.isValidBizType(model.bizType)) {
    return new restify.InvalidContentError('bizType参数错误');
  }
  if (!utils.isValidBizType(model.bizFrom)) {
    return new restify.InvalidContentError('bizFrom参数错误');
  }
  if (!model.updatedBy) {
    return new restify.InvalidContentError('updatedBy参数错误');
  }
  if (!model.version && model.version !== 0) {
    return new restify.InvalidContentError('version参数错误');
  }
}

function doAdd(model, callback) {
  business.findOrCreate({
    where: {
      $and: [
        {individualId: model.individualId},
        {firmId: model.firmId},
        {bizType: model.bizType},
        {bizFrom: model.bizFrom}
      ]
    },
    defaults: {
      individualId: model.individualId,
      firmId: model.firmId,
      bizType: model.bizType,
      bizFrom: model.bizFrom,
      createdBy: model.createdBy,
      updatedBy: model.createdBy
    }
  }).spread(function (result) {
    var model = result.get({plain: true});
    utils.formatModelDateTime(model);
    callback(null, model);
  });
}

function doUpdate(model, callback) {
  business.findAndCountAll({
    where: {
      $and: [
        {id: {$ne: model.id}},
        {individualId: model.individualId},
        {firmId: model.firmId},
        {bizType: model.bizType},
        {bizFrom: model.bizFrom}
      ]
    }
  }).then(function (result) {
    var length = result.count;
    if (length) {
      return callback(new restify.ConflictError('业务信息已存在'));
    }
    business.update({
      individualId: model.individualId,
      firmId: model.firmId,
      bizType: model.bizType,
      bizFrom: model.bizFrom,
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
}

var service = {
  get: function (callback) {
    business.findAndCountAll({
      include: [
        {model: individual},
        {model: firm}
      ]
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatModelDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  getById: function (id, callback) {
    business.findAndCountAll({
      where: {
        id: id
      },
      include: [
        {model: individual},
        {model: firm}
      ]
    }).then(function (result) {
      var count = result.count;
      var rows = result.rows;
      var model = {};
      if (count) {
        model = rows[0].get({plain: true});
        utils.formatModelDateTime(model);
      }
      callback(null, model);
    });
  },
  getByIndividualId: function (individualId, callback) {
    business.findAndCountAll({
      where: {
        individualId: individualId
      },
      include: [
        {model: individual},
        {model: firm}
      ]
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatModelDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  getByFirmId: function (firmId, callback) {
    business.findAndCountAll({
      where: {
        firmId: firmId
      },
      include: [
        {model: individual},
        {model: firm}
      ]
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatModelDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  getByBizType: function (bizType, callback) {
    business.findAndCountAll({
      where: {
        bizType: bizType
      },
      include: [
        {model: individual},
        {model: firm}
      ]
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatModelDateTime(model);
        array.push(model);
      });
      callback(null, array);
    });
  },
  getByBizFrom: function (bizFrom, callback) {
    business.findAndCountAll({
      where: {
        bizFrom: bizFrom
      },
      include: [
        {model: individual},
        {model: firm}
      ]
    }).then(function (result) {
      var rows = result.rows;
      var array = [];
      rows.forEach(function (obj) {
        var model = obj.get({plain: true});
        utils.formatModelDateTime(model);
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
    if (model.individualId) {
      individualService.getById(model.individualId, function (err, result) {
        if (model.individualId && (!result || !result.id)) {
          return callback(new restify.InvalidContentError('individualId不存在'));
        }
        doAdd(model, callback);
      });
    } else {
      firmService.getById(model.firmId, function (err, result) {
        if (!result || !result.id) {
          return callback(new restify.InvalidContentError('firmId不存在'));
        }
        doAdd(model, callback);
      });
    }
  },
  update: function (model, callback) {
    var err = checkUpdate(model);
    if (err) {
      return callback(err);
    }

    if (model.individualId) {
      individualService.getById(model.individualId, function (err, result) {
        if (model.individualId && !result.id) {
          return callback(new restify.InvalidContentError('individualId不存在'));
        }
        doUpdate(model, callback);
      });
    } else {
      firmService.getById(model.firmId, function (err, result) {
        if (!result.id) {
          return callback(new restify.InvalidContentError('firmId不存在'));
        }
        doUpdate(model, callback);
      });
    }
  },
  del: function (id, callback) {
    business.destroy({
      where: {
        id: id
      }
    }).then(function (result) {
      callback(null, result);
    });
  }
};

module.exports = service;
