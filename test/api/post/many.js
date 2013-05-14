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
  'POST /:type/:id,...,:id': {
    'POST /<missing_type>/*': {
      'POST /foo/1,2': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .post('/foo/1,2')
              .req(function(req) {
                req.send([{title: '/foo/1,2:1', description: 'Lorem ipsum.'}, {title: '/foo/1,2:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: '1', title: '/foo/1,2:1', description: 'Lorem ipsum.'}, {_type: 'foo', _id: '2', title: '/foo/1,2:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/foo/1,2?foo=bar')
              .req(function(req) {
                req.send([{title: '/foo/1,2?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/foo/1,2?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: '1', title: '/foo/1,2?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'foo', _id: '2', title: '/foo/1,2?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /foo/abc,aaa': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .post('/foo/abc,aaa')
              .req(function(req) {
                req.send([{title: '/foo/abc,aaa:1', description: 'Lorem ipsum.'}, {title: '/foo/abc,aaa:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc', title: '/foo/abc,aaa:1', description: 'Lorem ipsum.'}, {_type: 'foo', _id: 'aaa', title: '/foo/abc,aaa:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/foo/abc,aaa?foo=bar')
              .req(function(req) {
                req.send([{title: '/foo/abc,aaa?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/foo/abc,aaa?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc', title: '/foo/abc,aaa?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'foo', _id: 'aaa', title: '/foo/abc,aaa?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /foo/abc-123,aaa-123': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .post('/foo/abc-123,aaa-123')
              .req(function(req) {
                req.send([{title: '/foo/abc-123,aaa-123:1', description: 'Lorem ipsum.'}, {title: '/foo/abc-123,aaa-123:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc-123', title: '/foo/abc-123,aaa-123:1', description: 'Lorem ipsum.'}, {_type: 'foo', _id: 'aaa-123', title: '/foo/abc-123,aaa-123:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/foo/abc-123,aaa-123?foo=bar')
              .req(function(req) {
                req.send([{title: '/foo/abc-123,aaa-123?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/foo/abc-123,aaa-123?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'foo', _id: 'abc-123', title: '/foo/abc-123,aaa-123?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'foo', _id: 'aaa-123', title: '/foo/abc-123,aaa-123?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'POST /<existing_type>/<missing_id>,<missing_id>': {
      'POST /post/3,4': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3, 4], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/3,4')
              .req(function(req) {
                req.send([{title: '/post/3,4:1', description: 'Lorem ipsum.'}, {title: '/post/3,4:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3,4:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '4', title: '/post/3,4:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/3,4?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/3,4?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/3,4?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3,4?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '4', title: '/post/3,4?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/3,cba': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3, 'cba'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/3,cba')
              .req(function(req) {
                req.send([{title: '/post/3,cba:1', description: 'Lorem ipsum.'}, {title: '/post/3,cba:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3,cba:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba', title: '/post/3,cba:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/3,cba?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/3,cba?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/3,cba?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3,cba?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba', title: '/post/3,cba?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/3,cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3, 'cba-321'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/3,cba-321')
              .req(function(req) {
                req.send([{title: '/post/3,cba-321:1', description: 'Lorem ipsum.'}, {title: '/post/3,cba-321:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3,cba-321:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba-321', title: '/post/3,cba-321:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/3,cba-321?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/3,cba-321?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/3,cba-321?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '3', title: '/post/3,cba-321?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba-321', title: '/post/3,cba-321?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'POST /<existing_type>/<existing_id>,<missing_id>': {
      'POST /post/1,13': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/1,13:1', description: 'Lorem ipsum.'}], function() {
              Document('Post').del([13], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,13')
              .req(function(req) {
                req.send([{title: '/post/1,13:1', description: 'Lorem ipsum.'}, {title: '/post/1,13:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,13:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '13', title: '/post/1,13:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,13?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1,13?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/1,13?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,13?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '13', title: '/post/1,13?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/1,cba': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/1,cba:1', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,cba')
              .req(function(req) {
                req.send([{title: '/post/1,cba:1', description: 'Lorem ipsum.'}, {title: '/post/1,cba:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba', title: '/post/1,cba:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,cba?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1,cba?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/1,cba?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba', title: '/post/1,cba?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/1,cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba-321'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,cba-321')
              .req(function(req) {
                req.send([{title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}, {title: '/post/1,cba-321:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba-321', title: '/post/1,cba-321:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,cba-321?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1,cba-321?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/1,cba-321?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba-321?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'cba-321', title: '/post/1,cba-321?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'POST /<existing_type>/<missing_id>,<existing_id>': {
      'POST /post/13,1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/13,1:2', description: 'Lorem ipsum.'}], function() {
              Document('Post').del([13], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/13,1')
              .req(function(req) {
                req.send([{title: '/post/13,1:1', description: 'Lorem ipsum.'}, {title: '/post/13,1:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '13', title: '/post/13,1:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '1', title: '/post/13,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/13,1?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/13,1?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/13,1?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '13', title: '/post/13,1?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '1', title: '/post/13,1?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/cba,1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/cba,1:2', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/cba,1')
              .req(function(req) {
                req.send([{title: '/post/cba,1:1', description: 'Lorem ipsum.'}, {title: '/post/cba,1:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba', title: '/post/cba,1:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '1', title: '/post/cba,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/cba,1?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/cba,1?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/cba,1?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba', title: '/post/cba,1?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '1', title: '/post/cba,1?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/cba-321,1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/cba-321,1')
              .req(function(req) {
                req.send([{title: '/post/cba-321,1:1', description: 'Lorem ipsum.'}, {title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba-321', title: '/post/cba-321,1:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '1', title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/cba-321,1?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/cba-321,1?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/cba-321,1?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: 'cba-321', title: '/post/cba-321,1?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '1', title: '/post/cba-321,1?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'POST /<existing_type>/<existing_id>,<existing_id>': {
      'POST /post/1,2': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1, 2], [{title: '/post/1,2:1', description: 'Lorem ipsum.'}, {title: '/post/1,2:2', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,2')
              .req(function(req) {
                req.send([{title: '/post/1,2:1', description: 'Lorem ipsum.'}, {title: '/post/1,2:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,2:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '2', title: '/post/1,2:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,2?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1,2?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/1,2?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,2?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '2', title: '/post/1,2?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/1,abc': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1, 'abc'], [{title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc:2', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,abc')
              .req(function(req) {
                req.send([{title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc', title: '/post/1,abc:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,abc?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1,abc?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc', title: '/post/1,abc?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'POST /post/1,abc-123': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1, 'abc-123'], [{title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,abc-123')
              .req(function(req) {
                req.send([{title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc-123', title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .post('/post/1,abc-123?foo=bar')
              .req(function(req) {
                req.send([{title: '/post/1,abc-123?foo=bar:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc-123?foo=bar:2', description: 'Lorem ipsum.'}]);
              })
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'set');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc-123?foo=bar:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc-123', title: '/post/1,abc-123?foo=bar:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    }
  }
};
