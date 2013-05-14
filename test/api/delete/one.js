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
  'DELETE /:type/:id': {
    'DELETE /<missing_type>/*': {
      'DELETE /null/1': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .del('/null/1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/null/1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      },

      'DELETE /null/abc': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .del('/null/abc')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/null/abc?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      },

      'DELETE /null/abc-123': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .del('/null/abc-123')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/null/abc-123?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      }
    },

    'DELETE /<existing_type>/<existing_id>': {
      'DELETE /post/1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/1', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([true]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      },

      'DELETE /post/abc': function(done) {
        async.series([
          function(next) {
            Document('Post').set(['abc'], [{_id: '1', title: '/post/abc', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/abc')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([true]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/abc?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      },

      'DELETE /post/abc-123': function(done) {
        async.series([
          function(next) {
            Document('Post').set(['abc-123'], [{_id: '1', title: '/post/abc-123', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/abc-123')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([true]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/abc-123?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      }
    },

    'DELETE /<existing_type>/<missing_id>': {
      'DELETE /post/3': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/3')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/3?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      },

      'DELETE /post/cba': function(done) {
        async.series([
          function(next) {
            Document('Post').del(['cba'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/cba')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/cba?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      },

      'DELETE /post/cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').del(['cba-321'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/cba-321')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .del('/post/cba-321?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'del');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([false]);
                next();
              });
          }
        ], done);
      }
    }
  }
};
