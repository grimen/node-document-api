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
  'POST /': {
    'POST /': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .post('/')
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
  'POST /:type': {
    'POST /post': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .post('/post')
            .req(function(req) {
              req.send([{title: '/post', description: 'Lorem ipsum.'}]);
            })
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

    'POST /article': function(done) {
      async.series([
        function(done) {
          var api = API();
          req(api)
            .post('/article')
            .req(function(req) {
              req.send([{title: '/article', description: 'Lorem ipsum.'}]);
            })
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
