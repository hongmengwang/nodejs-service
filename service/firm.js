'use strict';

var restify = require('restify');
var constants = require('../commons/constants');
var utils = require('../commons/utils');
var firm = require('../model/firm');
var individual = require('../model/individual');
var individualService = require('./individual');

function checkAdd(model) {
  if (!model.individualId) {
    return new restify.InvalidContentError('individualId参数错误');
  }
  if (!model.name) {
    return new restify.InvalidContentError('name参数错误');
  }
  if (!utils.isValidFirmType(model.type)) {
    return new restify.InvalidContentError('type参数错误');
  }
  if (model.type === constants.FIRM_TYPE_SINGLE) {
    if (!model.creditCode) {
      return new restify.InvalidContentError('creditCode参数错误');
    }
  } else {
    if (!model.commercialCode) {
      return new restify.InvalidContentError('commercialCode参数错误');
    }
    if (!model.organizationCode) {
      return new restify.InvalidContentError('organizationCode参数错误');
    }
  }
  if (!model.contactPerson) {
    return new restify.InvalidContentError('contactPerson参数错误');
  }
  if (!model.contactPersonPhone) {
    return new restify.InvalidContentError('contactPersonPhone参数错误');
  }
  if (!model.createdBy) {
    return new restify.InvalidContentError('createdBy参数错误');
  }
}

function checkUpdate(model) {
  if (!model.id) {
    return new restify.InvalidContentError('id参数错误');
  }
  if (!model.individualId) {
    return new restify.InvalidContentError('individualId参数错误');
  }
  if (!model.name) {
    return new restify.InvalidContentError('name参数错误');
  }
  if (!utils.isValidFirmType(model.type)) {
    return new restify.InvalidContentError('type参数错误');
  }
  if (model.type === constants.FIRM_TYPE_SINGLE) {
    if (!model.creditCode) {
      return new restify.InvalidContentError('creditCode参数错误');
    }
  } else {
    if (!model.commercialCode) {
      return new restify.InvalidContentError('commercialCode参数错误');
    }
    if (!model.organizationCode) {
      return new restify.InvalidContentError('organizationCode参数错误');
    }
  }
  if (!model.contactPerson) {
    return new restify.InvalidContentError('contactPerson参数错误');
  }
  if (!model.contactPersonPhone) {
    return new restify.InvalidContentError('contactPersonPhone参数错误');
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
    firm.findAndCountAll({
      include: {model: individual}
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
    firm.findAndCountAll({
      where: {
        id: id
      },
      include: {
        model: individual
      }
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
    firm.findAndCountAll({
      where: {
        individualId: individualId
      },
      include: {
        model: individual
      }
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
  getByCreditCode: function (creditCode, callback) {
    firm.findAndCountAll({
      where: {
        creditCode: creditCode
      },
      include: {
        model: individual
      }
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
  getByCommercialOrganizationCode: function (commercialCode, organizationCode, callback) {
    firm.findAndCountAll({
      where: {
        commercialCode: commercialCode,
        organizationCode: organizationCode
      },
      include: {
        model: individual
      }
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
  add: function (model, callback) {
    var err = checkAdd(model);
    if (err) {
      return callback(err);
    }

    individualService.getById(model.individualId, function (err, result) {
      if (!result || !result.id) {
        return callback(new restify.InvalidContentError('individualId不存在'));
      }
      firm.findOrCreate({
        where: {
          $or: [
            {creditCode: model.creditCode},
            {commercialCode: model.commercialCode, organizationCode: model.organizationCode}
          ]
        },
        defaults: {
          individualId: model.individualId,
          name: model.name,
          type: model.type,
          creditCode: model.creditCode,
          commercialCode: model.commercialCode,
          organizationCode: model.organizationCode,
          contactPerson: model.contactPerson,
          contactPersonPhone: model.contactPersonPhone,
          address: model.address,
          createdBy: model.createdBy,
          updatedBy: model.createdBy
        }
      }).spread(function (result) {
        var model = result.get({plain: true});
        utils.formatModelDateTime(model);
        callback(null, model);
      });
    });
  },
  update: function (model, callback) {
    var err = checkUpdate(model);
    if (err) {
      return callback(err);
    }

    firm.findAndCountAll({
      where: {
        $and: [
          {id: {$ne: model.id}},
          {
            $or: [
              {creditCode: model.creditCode},
              {commercialCode: model.commercialCode, organizationCode: model.organizationCode}
            ]
          }
        ]
      }
    }).then(function (result) {
      var length = result.count;
      if (length) {
        return callback(new restify.ConflictError('企业信息已存在'));
      } else {
        individualService.getById(model.individualId, function (err, result) {
          if (!result || !result.id) {
            return callback(new restify.InvalidContentError('individualId不存在'));
          }
          firm.update({
            individualId: model.individualId,
            name: model.name,
            type: model.type,
            creditCode: model.creditCode,
            commercialCode: model.commercialCode,
            organizationCode: model.organizationCode,
            contactPerson: model.contactPerson,
            contactPersonPhone: model.contactPersonPhone,
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
      }
    });
  },
  del: function (id, callback) {
    firm.destroy({
      where: {
        id: id
      }
    }).then(function (result) {
      callback(null, result);
    });
  }
};

module.exports = service;
