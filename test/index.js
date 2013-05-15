var helper = require('./helper'),
    assert = helper.chai.assert,
    expect = helper.chai.expect,
    req = helper.chai.request,
    debug = helper.debug,
    async = helper.async;

var API = require('../lib/');
var Document = require('node-document');

var app;
var api;

var Post = Document('Post');
var Article = Document('Article');

var post;
var article;

// -----------------------
//  Test
// --------------------

module.exports = {

  'Middleware': {
    '()': function() {
      api = API();

      expect(api).to.be.a('function');

      expect(api.options).to.be.a('object');

      expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

      expect(api.options.route).to.be.a('string');
      expect(api.options.route).to.deep.equal('/');

      expect(api.options.models).to.be.a('array');
      expect(api.options.models).to.deep.equal([]);

      expect(api.options.mappers).to.have.property('type');
      expect(api.options.mappers.type).to.be.a('function');
    },

    '(options)': {
      '({})': function() {
        api = API({});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      },

      '({route: "/api"})': function() {
        api = API({route: "/api"});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/api');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      },

      '({methods: ["get", "post"]})': function() {
        api = API({methods: ["get", "post"]});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      }
    },

    '(<Model>)': {
      '(Post)': function() {
        api = API(Post);

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      }
    },

    '(<Model>, options)': {
      '(Post, {})': function() {
        api = API(Post, {});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      },

      '(Post, {route: "/api"})': function() {
        api = API(Post, {route: "/api"});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/api');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      },

      '(Post, {methods: ["get", "post"]})': function() {
        api = API(Post, {methods: ["get", "post"]});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      }
    },

    '(<Model>, <Model>)': {
      '(Post, Article)': function() {
        api = API(Post, Article);

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post, Article]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      }
    },

    '(<Model>, <Model>, options)': {
      '(Post, Article, {route: "/api"})': function() {
        api = API(Post, Article, {route: "/api"});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post', 'put', 'delete']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/api');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post, Article]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      },

      '(Post, Article, {methods: ["get", "post"]})': function() {
        api = API(Post, Article, {methods: ["get", "post"]});

        expect(api).to.be.a('function');

        expect(api.options).to.be.a('object');

        expect(api.options.methods).to.deep.equal(['get', 'post']);

        expect(api.options.route).to.be.a('string');
        expect(api.options.route).to.deep.equal('/');

        expect(api.options.models).to.be.a('array');
        expect(api.options.models).to.deep.equal([Post, Article]);

        expect(api.options.mappers).to.have.property('type');
        expect(api.options.mappers.type).to.be.a('function');
      }
    }
  },

  'HTTP API': [
    require('./api/get'),
    require('./api/post'),
    require('./api/put'),
    require('./api/delete')
  ]

};
