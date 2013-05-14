var helper = require('../helper'),
    assert = helper.chai.assert,
    expect = helper.chai.expect,
    req = helper.chai.request,
    debug = helper.debug,
    async = helper.async;

var document = require('../../lib/');
var Document = require('node-document');

var Post;
var Article;

var post;
var article;

var API = helper.API;

// -----------------------
//  Test
// --------------------

module.exports = {
  before: function() {
    expect(document).to.be.a('function');
  },

  'DELETE': [
    require('./delete/'),
    require('./delete/one'),
    require('./delete/many')
  ]
};
