var helper = require('../../helper'),
    assert = helper.chai.assert,
    expect = helper.chai.expect,
    req = helper.chai.request,
    debug = helper.debug,
    async = helper.async;

var document = require('../../../lib/');
var Document = require('node-document');

var Post = Document('Post');
var Article = Document('Article');

var post;
var article;

var API = helper.API;

// -----------------------
//  Test
// --------------------

module.exports = {
  'GET /:type/:id': {
    'GET /<missing_type>/*': {
      'GET /null/1': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .get('/null/1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/null/1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          }
        ], done);
      },

      'GET /null/abc': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          }
        ], done);
      },

      'GET /null/abc-123': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc-123')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc-123?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          }
        ], done);
      }
    },

    'GET /<existing_type>/<existing_id>': {
      'GET /post/1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/1', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'GET /post/abc': function(done) {
        async.series([
          function(next) {
            Document('Post').set(['abc'], [{_id: '1', title: '/post/abc', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/abc')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/abc', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/abc?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/abc', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'GET /post/abc-123': function(done) {
        async.series([
          function(next) {
            Document('Post').set(['abc-123'], [{_type: 'post', _id: '1', title: '/post/abc-123', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/abc-123')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/abc-123', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/abc-123?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/abc-123', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'GET /<existing_type>/<missing_id>': {
      'GET /post/3': function(done) {
        async.series([
          function(next) {
            Document('Post').del([0], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          }
        ], done);
      },

      'GET /post/cba': function(done) {
        async.series([
          function(next) {
            Document('Post').del(['cba'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          }
        ], done);
      },

      'GET /post/cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').del(['cba-321'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba-321')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba-321?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null]);
                next();
              });
          }
        ], done);
      }
    }
  }
};
