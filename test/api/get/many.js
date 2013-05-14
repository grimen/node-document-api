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
  'GET /:type/:id,...,:id': {
    'GET /<missing_type>/*': {
      'GET /null/1,2': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .get('/null/1,2')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/null/1,2?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          }
        ], done);
      },

      'GET /null/abc,aaa': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc,aaa')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc,aaa?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          }
        ], done);
      },

      'GET /null/abc-123,aaa-123': function(done) {
        async.series([
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc-123,aaa-123')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/null/abc-123,aaa-123?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          }
        ], done);
      }
    },

    'GET /<existing_type>/<missing_id>,<missing_id>': {
      'GET /post/3,4': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3, 4], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3,4')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3,4?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          }
        ], done);
      },

      'GET /post/3,cba': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3, 'cba'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3,cba')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3,cba?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          }
        ], done);
      },

      'GET /post/3,cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').del([3, 'cba-321'], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3,cba-321')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/3,cba-321?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, null]);
                next();
              });
          }
        ], done);
      }
    },

    'GET /<existing_type>/<existing_id>,<missing_id>': {
      'GET /post/1,13': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/1,13:1', description: 'Lorem ipsum.'}], function() {
              Document('Post').del([13], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,13')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,13:1', description: 'Lorem ipsum.'}, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,13?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,13:1', description: 'Lorem ipsum.'}, null]);
                next();
              });
          }
        ], done);
      },

      'GET /post/1,cba': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/1,cba:1', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,cba')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba:1', description: 'Lorem ipsum.'}, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,cba?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba:1', description: 'Lorem ipsum.'}, null]);
                next();
              });
          }
        ], done);
      },

      'GET /post/1,cba-321': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba-321'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,cba-321')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}, null]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,cba-321?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}, null]);
                next();
              });
          }
        ], done);
      }
    },

    'GET /<existing_type>/<missing_id>,<existing_id>': {
      'GET /post/13,1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/13,1:2', description: 'Lorem ipsum.'}], function() {
              Document('Post').del([13], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/13,1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, {_type: 'post', _id: '1', title: '/post/13,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/13,1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, {_type: 'post', _id: '1', title: '/post/13,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'GET /post/cba,1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/cba,1:2', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba,1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, {_type: 'post', _id: '1', title: '/post/cba,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba,1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, {_type: 'post', _id: '1', title: '/post/cba,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'GET /post/cba-321,1': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1], [{_id: '1', title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}], function() {
              Document('Post').del(['cba'], function() { next(); });
            });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba-321,1')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, {_type: 'post', _id: '1', title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/cba-321,1?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([null, {_type: 'post', _id: '1', title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    },

    'GET /<existing_type>/<existing_id>,<existing_id>': {
      'GET /post/1,2': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1, 2], [{_id: '1', title: '/post/1,2:1', description: 'Lorem ipsum.'}, {_id: '2', title: '/post/1,2:2', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,2')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,2:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '2', title: '/post/1,2:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,2')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,2:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '2', title: '/post/1,2:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,2?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,2:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: '2', title: '/post/1,2:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'GET /post/1,abc': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1, 'abc'], [{_id: '1', title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc', title: '/post/1,abc:2', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,abc')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc', title: '/post/1,abc:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,abc?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc', title: '/post/1,abc:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      },

      'GET /post/1,abc-123': function(done) {
        async.series([
          function(next) {
            Document('Post').set([1, 'abc-123'], [{_id: '1', title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc-123', title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}], function() { next(); });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,abc-123')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc-123', title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}]);
                next();
              });
          },
          function(next) {
            var api = API();
            req(api)
              .get('/post/1,abc-123?foo=bar')
              .res(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('x-powered-by', 'connect, node-document');
                expect(res).to.have.header('x-node-document', 'get');
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body).to.deep.equal([{_type: 'post', _id: '1', title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {_type: 'post', _id: 'abc-123', title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}]);
                next();
              });
          }
        ], done);
      }
    }
  }
};
