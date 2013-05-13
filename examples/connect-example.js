var connect = require('connect')
var http = require('http');

var Document = require('node-document');
var API = require('../');

var Post = Document('Post');

Post.api = API({route: '/api'});

var app = connect();

app
  .use(Post.api)
  .use(function(req, res) {
    res.end("Hello world!");
  });

http.createServer(app).listen(3000, function() {
  console.log('[node-document-api/examples/connect-example.js]: Listening on port %s', 3000);
});
