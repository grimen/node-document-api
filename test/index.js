var helper = require('./helper'),
    assert = helper.chai.assert,
    expect = helper.chai.expect,
    req = helper.chai.request,
    debug = helper.debug,
    async = helper.async;

var connect = require('connect');
var document = require('../lib/');

var app;
var api;

var Post;
var Article;

var post;
var article;

// -----------------------
//  Test
// --------------------

module.exports = {

  'API': [
    require('./api/get'),
    require('./api/post'),
    require('./api/put'),
    require('./api/delete')
  ]

};
