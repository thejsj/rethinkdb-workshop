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
      return r.branch(
        r.table('users').get(email),
        false,
        r.table('users').insert({
          email: email,
          password: hash
        })
      ).run(r.conn);
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
