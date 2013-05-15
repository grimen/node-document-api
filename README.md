# NODE-DOCUMENT-API *preview* [![Build Status](https://secure.travis-ci.org/grimen/node-document-api.png)](http://travis-ci.org/grimen/node-document-api)

**HTTP API** endpoint/middleware for [node-document](https://github.com/grimen/node-document) ODM for Node.js.

Work in progress; see **[TODO](https://github.com/grimen/node-document-api/blob/master/TODO)**.


## About

Unified HTTP API for write/read data to/from differen kinds of storages/databases.


## HTTP API

### `POST`

* `(:route)/:type`

    ```text
    HTTP POST /post
      {
        "title": "Post",
        "description": "Lorem ipsum..."
      }
    ```

    ```javascript
    /*
      200 OK
    */
    [
      {
        "_type": "post",
        "_id": "eaf56300-7785-4c9a-a103-6895f873bff7",
        "title": "Post",
        "description": "Lorem ipsum..."
      }
    ]
    ```

* `(:route)/:type/:id`

    ```text
    HTTP POST /post/1
      {
        "title": "Post 1",
        "description": "Lorem ipsum..."
      }
    ```

    ```javascript
    /*
      200 OK
    */
    [
      {
        "_type": "post",
        "_id": 1,
        "title": "Post 1",
        "description": "Lorem ipsum..."
      }
    ]
    ```

* `(:route)/:type/:id,...,:id`

    ```text
    HTTP POST /post/1,2,3
      [
        {
          "title": "Post 1",
          "description": "Lorem ipsum..."
        },
        {
          "title": "Post 2",
          "description": "Lorem ipsum..."
        },
        {
          "title": "Post 3",
          "description": "Lorem ipsum..."
        }
      ]
    ```

    ```javascript
    /*
      200 OK
    */
    [
      true,
      true,
      true
    ]
    ```

### `PUT`

* `(:route)/:type/:id`

    ```text
    HTTP PUT /post/1
      {
        "title": "Post 1",
        "description": "Lorem ipsum...",
        "extra": true
      }
    ```

    ```javascript
    /*
      200 OK
    */
    [
      {
        "_type": "post",
        "_id": 1,
        "title": "Post 1",
        "description": "Lorem ipsum...",
        "extra": true
      }
    ]
    ```

* `(:route)/:type/:id,...,:id`

    ```text
    HTTP PUT /post/1,2,3
      [
        {
          "title": "Post 1",
          "description": "Lorem ipsum...",
          "extra": true
        },
        {
          "title": "Post 2",
          "description": "Lorem ipsum...",
          "extra": true
        },
        {
          "title": "Post 3",
          "description": "Lorem ipsum...",
          "extra": true
        }
      ]
    ```

    ```javascript
    /*
      200 OK
    */
    [
      true,
      true,
      true
    ]
    ```

### `GET`

* `(:route)/:type/:id`

    ```text
    HTTP GET /post/1
    ```

    ```javascript
    /*
      200 OK
    */
    [
      {
        "_type": "post",
        "_id": 1,
        "title": "Post 1",
        "description": "Lorem ipsum..."
      }
    ]
    ```

* `(:route)/:type/:id,...,:id`

    ```text
    HTTP GET /post/1,2,3
    ```

    ```javascript
    /*
      200 OK
    */
    [
      {
        "_type": "post",
        "_id": 1,
        "title": "Post 1",
        "description": "Lorem ipsum..."
      },
      {
        "_type": "post",
        "_id": 2,
        "title": "Post 2",
        "description": "Lorem ipsum..."
      },
      {
        "_type": "post",
        "_id": 3,
        "title": "Post 3",
        "description": "Lorem ipsum..."
      }
    ]
    ```

### `DELETE`

* `(:route)/:type/:id`

    ```text
    HTTP DELETE /post/1
    ```

    ```javascript
    /*
      200 OK
    */
    [
      {
        "_type": "post",
        "_id": 1,
        "title": "Post 1",
        "description": "Lorem ipsum..."
      }
    ]
    ```

* `(:route)/:type/:id,...,:id`

    ```text
    HTTP DELETE /post/1,2,3
    ```

    ```javascript
    /*
      200 OK
    */
    [
      false,
      true,
      true
    ]
    ```


## Example

Using [Connect.js](https://github.com/senchalabs/connect):

```javascript
  var connect = require('connect')
  var http = require('http');

  var Document = require('node-document');
  var API = require('node-document-api');

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
```

Using [Express.js](https://github.com/visionmedia/express):

```javascript
  var express = require('express')

  var Document = require('node-document');
  var API = require('node-document-api');

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
```


## Installation

```shell
  $ npm install node-document-api
```


## Test

**Local tests:**

```shell
  $ make test
```


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)
