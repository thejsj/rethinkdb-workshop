/*jshint node:true */
'use strict';
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var r = require('../db');

var authController = {};

authController.signup = function (req, res) {
  var email = req.body.email || req.param('email');
  var password = req.body.password || req.param('password');
  var cipher = bluebird.promisify(bcrypt.hash);
  if (!email || !password) {
    res.status(400).end(); // Client Error
    return;
  }
  return cipher(password, null, null)
    .then(function (hash) {
      /*!
       * Step 1 : Creating user
       *
       * Query instructions:
       * Write a query that checks if a user exists in the database
       * and inserts a document with `email` and `password` if it
       * doesn't and returns false if the use already exists
       *
       * HINT: Don't use the `filter` method
       * ADVANCED: Try using the `branch` method
       *
       * Result:
       * Once you have completed this query correctly, you'll be able
       * to sign up in the front-end and see the registered user
       * in the database. You won't be able to sign in.
       */
    })
    .then(function (result) {
       if (!result) res.send('User already exists');
       res.send('User ' + email + ' created.');
    });
};

authController.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

authController.login = function (req, res) {
  res.redirect('/');
};

module.exports = authController;
