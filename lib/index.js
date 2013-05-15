require('sugar');
var connect = require('connect');
var fun = require('funargs');
var inspect = require('util').inspect;
var uri = require('url');

var id = require('./util/ids');

var Document = require('node-document');


// -----------------------
//  TODO
// --------------------
//
//   - [FEATURE]: EventEmitter-based API for debugging etc.
//         Example:
//            - API.on('mount', ...)
//            - API.on('req', ...)
//            - API.on('res', ...)
//

// -----------------------
//  Module
// --------------------

function API () {
  var args = fun(arguments);

  var models = args.functions().filter(function(arg) { return arg && arg.type; });
  var options = args.objects().filter(function(arg) { return arg && !arg.type; })[0] || {};

  var app = function(req, res, next) {
    var method = req.method.toLowerCase();

    switch (method) {
    // case 'head':
    // case 'options':
    case 'get':
    case 'post':
    case 'put':
    case 'delete':
      API[method](app.options)(req, res, next);
      break;
    default:
      return next();
    }
  };

  app.options = Object.clone(API.defaults || {}, true);
  app.options.models = models || options.models || app.options.models;
  app.options.route = options.route || app.options.route;
  app.options.methods = options.methods || app.options.methods;
  app.options.mappers = options.mappers || app.options.mappers;

  return app;
}

API.args = function(req, res, next, options, done) {

  // Skip if route is not specified one.
  if (!req.url.startsWith(options.route)) {
    return next();
  }

  var args = {};

  var uri_parts = uri.parse(req.url);

  args.method = req.method.toLowerCase();
  args.uri = uri_parts.pathname.replace(options.route || '', '/').split(/[\/]/).filter(function(v) { return !(v || '').isBlank(); });
  args.type = args.uri[0];
  args.ids = id(args.uri[1] || '');
  args.data;

  API.body(req, res, function(err) {
    if (err) {
      return next(err);
    }

    args.data = req.body;

    try {
      console.log('\n\t\t' + '%s '.magenta + '%s '.cyan + '=> ' + '%s '.grey + '%s '.grey + '%s '.grey + '\n', req.method, req.url, args.type, inspect(args.ids), inspect(args.data));
    } catch (err) {}

    // Skip if method is not an allowed one.
    if ((options.methods || []).length) {
      if (options.methods.compact().map(function(verb) { return verb.toLowerCase(); }).indexOf(args.method) < 0) {
        return next();
      }
    }

    // Skip if no type defined.
    if (!args.type || args.type.isBlank()) {
      return next();
    }

    // Skip if type is not mounted.
    if (options.models && options.models.length && !options.models.compact().find(function(model) { return model.type.toLowerCase() === args.type; })) {
      return next();
    }

    // Map type to model.
    args.type = options.mappers.type(args.type); // e.g. "some-model" or "some_model" => "SomeModel"

    // TEMP: If no id(s) specified then bail; "get all" not supported yet.
    if (!args.ids.length && !args.data.length) {
      res.writeHeader(API.status.UNSUPPORTED, API.headers('noop'));
      return res.end(JSON.stringify([]));
    }

    // Document args OK.
    done(args);
  });
};

API.status = {
  'OK': 200,
  'UNSUPPORTED': 405
};

API.body = function(req, res, next) {
  connect.json()(req, res, function(err) {
    if (err) {
      res.end(JSON.stringify(err));
    }
    next();
  });
};

API.headers = function(operation) {
  return {
    'content-type': 'application/json',
    'x-powered-by': 'connect, node-document',
    'x-node-document': operation
  };
};

// TODO: Make this customizable through options.
API.response = function(args, reply) {
  return Array.create(reply).map(function(r) { return Object.isObject(r) ? Object.merge({'_type': args.type.underscore()}, r) : r; });
};

API.get = function(options) {
  return function(req, res, next) {
    API.args(req, res, next, options, function(args) {
      try {
        Document(args.type).get(args.ids, function(err, reply) {
          reply = API.response(args, reply);

          res.writeHeader(API.status.OK, API.headers('get'));
          res.end(JSON.stringify(reply));
        });

      } catch (err) {
        res.writeHeader(API.status.OK, API.headers('set,error'));
        res.end(JSON.stringify({error: err.message}));
      }
    });
  };
};

API.post = function(options) {
  return function(req, res, next) {
    API.args(req, res, next, options, function(args) {
      try {
        var Doc = Document(args.type);
        var docs = args.data.map(function(doc_body, i) {
          var doc = new Doc(doc_body);
          doc.id = args.ids[i];
          return doc;
        });

        Document(docs).save(function(err, reply) {
          Document(args.type).get(docs.id, function(err, reply) {
            reply = API.response(args, reply);

            res.writeHeader(API.status.OK, API.headers('set'));
            res.end(JSON.stringify(reply));
          });
        });

      } catch (err) {
        res.writeHeader(API.status.OK, API.headers('set,error'));
        res.end(JSON.stringify({error: err.message}));
      }
    });
  };
};

API.put = function(options) {
  return function(req, res, next) {
    API.args(req, res, next, options, function(args) {
      try {
        var Doc = Document(args.type);
        var docs = args.ids.map(function(id, i) {
          var doc = new Doc(args.data[i]);
          doc.id = id;
          return doc;
        });

        Document(docs).save(function(err, reply) {
          Document(args.type).get(docs.id, function(err, reply) {
            reply = API.response(args, reply);

            res.writeHeader(API.status.OK, API.headers('set'));
            res.end(JSON.stringify(reply));
          });
        });

      } catch (err) {
        res.writeHeader(API.status.OK, API.headers('set,error'));
        res.end(JSON.stringify({error: err.message}));
      }
    });
  };
};

API.delete = function(options) {
  return function(req, res, next) {
    API.args(req, res, next, options, function(args) {
      try {
        Document(args.type).del(args.ids, function(err, reply) {
          reply = API.response(args, reply);

          res.writeHeader(API.status.OK, API.headers('del'));
          res.end(JSON.stringify(reply));
        });

      } catch (err) {
        res.writeHeader(API.status.OK, API.headers('del,error'));
        res.end(JSON.stringify({error: err.message}));
      }
    });
  };
};


// -----------------------
//  Default options
// --------------------

API.defaults = {
  methods: ['get', 'post', 'put', 'delete'],
  // TODO: route: '/:type/:id',
  route: '/',
  mappers: {
    type: function(type) {
      return type.camelize();
    }
  }
};

// -----------------------
//  Export
// --------------------

module.exports = API;
