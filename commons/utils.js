'use strict';

var moment = require('moment');
var constants = require('./constants');
var Response = require('../model/response');

var utils = {
  formatDateTime: function (date, format) {
    if (format) {
      return moment(date).format(format);
    }
    return moment(date).format(constants.TIMESTAMP_FORMAT);
  },
  now: function (format) {
    if (format) {
      return moment(new Date()).format(format);
    }
    return moment(new Date()).format(constants.TIMESTAMP_FORMAT);
  },
  formatModelDateTime: function (model) {
    if (model.createdAt) {
      model.createdAt = this.formatDateTime(model.createdAt);
    }
    if (model.updatedAt) {
      model.updatedAt = this.formatDateTime(model.updatedAt);
    }
    if (model.birthDate) {
      model.birthDate = this.formatDateTime(model.birthDate);
    }
  },
  buildResponse: function (success, message, data) {
    var response = new Response(success, message, data);
    response.timestamp = this.now();
    return response;
  },
  isValidIdType: function (type) {
    return constants.ID_TYPE.indexOf(type) > -1;
  },
  isValidFirmType: function (type) {
    return constants.FIRM_TYPE.indexOf(type) > -1;
  },
  isValidBizType: function (type) {
    return constants.BIZ_TYPE.indexOf(type) > -1;
  }
};

module.exports = utils;
