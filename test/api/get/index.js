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
  'GET /': {
    'GET /': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .get('/')
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
  // TODO: Listing documents are not supported by `node-document-storage` yet.
  'GET /:type': {
    'GET /post': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .get('/post')
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

    'GET /article': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .get('/article')
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
