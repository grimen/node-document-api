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

  'PUT': {
    'PUT /': {
      'PUT /': function(done) {
        async.series([
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

      'PUT /article': function(done) {
        async.series([
          function(done) {
            var api = API();
            req(api)
              .put('/article')
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
    },

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
    },

    'PUT /:type/:id,...,:id': {
      'PUT /<missing_type>/*': {
        'PUT /foo/1,2': function(done) {
          async.series([
            function(next) {
              var api = API();
              req(api)
                .put('/foo/1,2')
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
                .put('/foo/1,2?foo=bar')
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

        'PUT /foo/abc,aaa': function(done) {
          async.series([
            function(next) {
              var api = API();
              req(api)
                .put('/foo/abc,aaa')
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
                .put('/foo/abc,aaa?foo=bar')
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

        'PUT /foo/abc-123,aaa-123': function(done) {
          async.series([
            function(next) {
              var api = API();
              req(api)
                .put('/foo/abc-123,aaa-123')
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
                .put('/foo/abc-123,aaa-123?foo=bar')
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

      'PUT /<existing_type>/<missing_id>,<missing_id>': {
        'PUT /post/3,4': function(done) {
          async.series([
            function(next) {
              Document('Post').del([3, 4], function() { next(); });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/3,4')
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
                .put('/post/3,4?foo=bar')
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

        'PUT /post/3,cba': function(done) {
          async.series([
            function(next) {
              Document('Post').del([3, 'cba'], function() { next(); });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/3,cba')
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
                .put('/post/3,cba?foo=bar')
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

        'PUT /post/3,cba-321': function(done) {
          async.series([
            function(next) {
              Document('Post').del([3, 'cba-321'], function() { next(); });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/3,cba-321')
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
                .put('/post/3,cba-321?foo=bar')
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

      'PUT /<existing_type>/<existing_id>,<missing_id>': {
        'PUT /post/1,13': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1], [{title: '/post/1,13:1', description: 'Lorem ipsum.'}], function() {
                Document('Post').del([13], function() { next(); });
              });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/1,13')
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
                .put('/post/1,13?foo=bar')
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

        'PUT /post/1,cba': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1], [{title: '/post/1,cba:1', description: 'Lorem ipsum.'}], function() {
                Document('Post').del(['cba'], function() { next(); });
              });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/1,cba')
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
                .put('/post/1,cba?foo=bar')
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

        'PUT /post/1,cba-321': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1], [{title: '/post/1,cba-321:1', description: 'Lorem ipsum.'}], function() {
                Document('Post').del(['cba-321'], function() { next(); });
              });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/1,cba-321')
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
                .put('/post/1,cba-321?foo=bar')
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

      'PUT /<existing_type>/<missing_id>,<existing_id>': {
        'PUT /post/13,1': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1], [{title: '/post/13,1:2', description: 'Lorem ipsum.'}], function() {
                Document('Post').del([13], function() { next(); });
              });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/13,1')
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
                .put('/post/13,1?foo=bar')
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

        'PUT /post/cba,1': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1], [{title: '/post/cba,1:2', description: 'Lorem ipsum.'}], function() {
                Document('Post').del(['cba'], function() { next(); });
              });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/cba,1')
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
                .put('/post/cba,1?foo=bar')
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

        'PUT /post/cba-321,1': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1], [{title: '/post/cba-321,1:2', description: 'Lorem ipsum.'}], function() {
                Document('Post').del(['cba'], function() { next(); });
              });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/cba-321,1')
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
                .put('/post/cba-321,1?foo=bar')
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

      'PUT /<existing_type>/<existing_id>,<existing_id>': {
        'PUT /post/1,2': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1, 2], [{title: '/post/1,2:1', description: 'Lorem ipsum.'}, {title: '/post/1,2:2', description: 'Lorem ipsum.'}], function() { next(); });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/1,2')
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
                .put('/post/1,2?foo=bar')
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

        'PUT /post/1,abc': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1, 'abc'], [{title: '/post/1,abc:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc:2', description: 'Lorem ipsum.'}], function() { next(); });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/1,abc')
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
                .put('/post/1,abc?foo=bar')
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

        'PUT /post/1,abc-123': function(done) {
          async.series([
            function(next) {
              Document('Post').set([1, 'abc-123'], [{title: '/post/1,abc-123:1', description: 'Lorem ipsum.'}, {title: '/post/1,abc-123:2', description: 'Lorem ipsum.'}], function() { next(); });
            },
            function(next) {
              var api = API();
              req(api)
                .put('/post/1,abc-123')
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
                .put('/post/1,abc-123?foo=bar')
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

  } // PUT
};
