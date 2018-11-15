'use strict';

module.exports = function(Bisurvey) {
  Bisurvey.greet = function(msg, cb) {
    cb(null, 'Greetings... ' + msg);
  };

  Bisurvey.remoteMethod('greet', {
    accepts: {arg: 'msg', type: 'string'},
    returns: {arg: 'greeting', type: 'string'},
  });

  Bisurvey.status = function(cb) {
    var currentSurvey = Bisurvey.findOne();
    // currentSurvey = JSON.stringify(currentSurvey);
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, currentSurvey);
  };

  Bisurvey.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get',
      },
      returns: {
        arg: 'status',
        type: 'string',
      },
    }
  );
};
