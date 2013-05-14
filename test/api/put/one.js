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
  'PUT /:type/:id': {
    'PUT /<missing_type>/*': {
      'PUT /foo/1': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .put('/foo/1')
              .req(function(req) {
                req.send([{title: '/foo/1', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: '1', title: '/foo/1', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api).put('/foo/1?foo=bar')
              .req(function(req) {
                req.send([{title: '/foo/1?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: '1', title: '/foo/1?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'PUT /foo/abc': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .put('/foo/abc')
              .req(function(req) {
                req.send([{title: '/foo/abc', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc', title: '/foo/abc', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/foo/abc?foo=bar')
              .req(function(req) {
                req.send([{title: '/foo/abc?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc', title: '/foo/abc?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'PUT /foo/abc-123': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .put('/foo/abc-123')
              .req(function(req) {
                req.send([{title: '/foo/abc-123', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc-123', title: '/foo/abc-123', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/foo/abc-123?foo=bar')
              .req(function(req) {
                req.send([{title: '/foo/abc-123?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc-123', title: '/foo/abc-123?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'PUT /<existing_type>/<existing_id>': {
      'PUT /post/1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/1', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/1')
              .req(function(req) {
                req.send([{title: '/post/1', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/1?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'PUT /post/abc': function(done) {
        async.series([
          function(next) {
            Document('Post').set(['abc'], [{title: '/post/abc', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/abc')
              .req(function(req) {
                req.send([{title: '/post/abc', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'abc', title: '/post/abc', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/abc?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/abc?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'abc', title: '/post/abc?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'PUT /post/abc-123': function(done) {
        async.series([
          function(next) {
            Document('Post').set(['abc-123'], [{title: '/post/abc-123', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/abc-123')
              .req(function(req) {
                req.send([{title: '/post/abc-123', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'abc-123', title: '/post/abc-123', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/abc-123?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/abc-123?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'abc-123', title: '/post/abc-123?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'PUT /<existing_type>/<missing_id>': {
      'PUT /post/3': function(done) {
        async.series([
          function(next) {
            Document('Post').del([0], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/3')
              .req(function(req) {
                req.send([{title: '/post/3', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/3?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/3?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'PUT /post/cba': function(done) {
        async.series([
          function(next) {
            Document('Post').del(['cba'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/cba')
              .req(function(req) {
                req.send([{title: '/post/cba', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba', title: '/post/cba', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/cba?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/cba?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba', title: '/post/cba?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'PUT /post/cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').del(['cba-321'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/cba-321')
              .req(function(req) {
                req.send([{title: '/post/cba-321', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba-321', title: '/post/cba-321', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .put('/post/cba-321?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/cba-321?foo=bar', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba-321', title: '/post/cba-321?foo=bar', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    }
  }
};
