/*jshint node:true */
'use strict';

var config = require('config');
var express = require('express');
var session = require('express-session');
var engines = require('consolidate');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var r = require('./db');
var clientConfigParser = require('./clientConfigParser');

var auth = require('./auth');
var authRouter = require('./auth/auth-router');

server.listen(config.get('ports').http);

// Middleware
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: 'zfnzkwjehgweghw',
    resave: false,
    saveUninitialized: true
  }))
  .use(auth.initialize())
  .use(auth.session());

// Views
app
  .set('views', __dirname + '/views')
  .engine('html', engines.mustache)
  .set('view engine', 'html');

// Routes
app
  .use('/auth', authRouter)
  .use('/messages', function (req, res) {
    /*!
     * Query Instructions:
     * Write a query that gets all messages,
     * ordered by `created` (a secondary index)
     *
     * Callback Instructions:
     * Return the messages array as a JSON document through `res`:
     *   res.json(messages);
     *
     * Result:
     * Once you have written this query, you'll be able to see
     * all previously inserted messages when loading the page
     */
    r.table('messages')
     .orderBy({index: 'created'})
     .coerceTo('array')
     .run(r.conn)
     .then(function (messages) {
       res.json(messages);
     });
  })
  .use('/config.js', clientConfigParser)
  .get('/', function (req, res) {
    res.render('index.html', { user: req.user });
  })
  .use(express.static(__dirname + '/../client'))
  .use('*', function (req, res) {
    res.send('404 Not Found');
  });

io.on('connection', function (socket) {
  // Listen to new message being inserted
  /*!
   * Query Instructions:
   * Write a query that listens to changes in the
   * `messages` table
   * HINT: the query will return a cursor, not an array
   * HINT: The objects return by the cursor have a `new_val` and an `old_val` property
   *
   * Callback Instructions:
   * Every time a change is pushed by the database, push that change to
   * the client by emitting a socket event:
   *   socket.emit('message', row.new_val);
   *
   * Result:
   * Once you write this query, you'll be able to see new messages be displayed
   * as they are being added
   */
  r.table('messages')
    .changes().run(r.conn)
    .then(function(cursor) {
      cursor.each(function (err, row) {
        socket.emit('message', row.new_val);
      }, function () { });
    });

  // Insert new messages
  socket.on('message', function (data) {
    /*!
     * Query Instructions:
     * Insert a document into the `messages` table with
     * the following attributes: `text`, `email`, `created`
     *
     * Fields:
     * text: A string with the message text from the user
     * email: An email address that exists in the `users` table
     * created: A Unix Timestamp `(new Date()).getTime()`
     *
     * Result:
     * Once you write this query, you'll be able to insert new
     * messages in the front-end and see them in the database
     */
    r.table('messages').insert({
      text: data.text,
      email: data.email,
      created: (new Date()).getTime()
    }).run(r.conn);
  });

});
