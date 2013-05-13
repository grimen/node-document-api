process.env.NODE_ENV = 'test';

process.setMaxListeners(process.env.MAX_LISTENERS || 0);

require('sugar');
require('colors');

module.exports.chai = require('chai');
module.exports.chai.Assertion.includeStack = true;
module.exports.chai.use(require('chai-http'));

module.exports.async = require('async');

module.exports.debug = console.log;

// module.exports.longjohn = require('longjohn');
// module.exports.longjohn.async_trace_limit = 3;

// REVIEW: http://chaijs.com/plugins

module.exports.flag = function(value, default_value) {
  if (typeof value === 'undefined') {
    return (default_value === undefined) ? false : default_value;
  } else {
    return (/^1|true$/i).test('' + value); // ...to avoid the boolean/truthy ghetto.
  }
};

module.exports.API = function() {
  var app = function(req, res) {
    res.writeHeader(200, {
      'content-type': 'application/json',
      'x-powered-by': 'connect'
    });
    res.end(JSON.stringify({hello: "world"}));
  };

  var api = require('connect')();

  api.use(require('../').apply(this, arguments));
  api.use(app);

  return api;
};
