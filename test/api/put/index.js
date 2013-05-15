var helper = require('../../helper'),
    assert = helper.chai.assert,
    expect = helper.chai.expect,
    req = helper.chai.request,
    debug = helper.debug,
    async = helper.async;

var document = require('../../../lib/');
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
  'PUT /': {
    'PUT /': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .put('/')
            .res(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.have.header('x-powered-by', 'connect');
              expect(res).to.have.header('content-type', 'application/json');
              expect(res.body).to.deep.equal({hello: "world"});
              done();
            });
        },
        function(done) {
          var api = API();
          req(api)
            .put('/')
            .req(function(req) {
              req.send([{title: '/', description: 'Lorem ipsum.'}]);
            })
            .res(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.have.header('x-powered-by', 'connect');
              expect(res).to.have.header('content-type', 'application/json');
              expect(res.body).to.deep.equal({hello: "world"});
              done();
            });
        }
      ], done);
    }
  },

  // TODO: Send back created document.
  'PUT /:type': {
    'PUT /post': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .put('/post')
            .res(function(res) {
              expect(res).to.have.status(405);
              expect(res).to.have.header('x-powered-by', 'connect, node-document');
              expect(res).to.have.header('x-node-document', 'noop');
              expect(res).to.have.header('content-type', 'application/json');
              expect(res.body).to.deep.equal([]);
              done();
            });
        }
      ], done);
    },

    'PUT /article': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .put('/article')
            .res(function(res) {
              expect(res).to.have.status(405);
              expect(res).to.have.header('x-powered-by', 'connect, node-document');
              expect(res).to.have.header('x-node-document', 'noop');
              expect(res).to.have.header('content-type', 'application/json');
              expect(res.body).to.deep.equal([]);
              done();
            });
        }
      ], done);
    }
  }
};
