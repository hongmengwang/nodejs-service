'use strict';

var constants = {
  ERROR_MESSAGE: 'Sorry, Please Try Later',
  TIMESTAMP_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  DATE_FORMAT: 'YYYY-MM-DD',
  JSON_TYPE: 'application/json',
  ID_TYPE: ['identity', 'driver', 'police', 'military', 'passport', 'residence'],
  FIRM_TYPE: ['single', 'multi'],
  FIRM_TYPE_SINGLE: this.FIRM_TYPE[0],
  BIZ_TYPE: ['passport', 'payment', 'financing', 'loan', 'activity', 'debt']
};

module.exports = constants;
    
