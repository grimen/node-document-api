var express = require('express')

var Document = require('node-document');
var API = require('../');

var Post = Document('Post');

Post.api = API({route: '/api'});

var app = express();

app
  .use(Post.api)
  .use(function(req, res) {
    res.end("Hello world!");
  });

app.listen(3000, function() {
  console.log('[node-document-api/examples/express-example.js]: Listening on port %s', 3000);
});
