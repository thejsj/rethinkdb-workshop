/*jshint node:true */
'use strict';

var express = require('express');
var authControllers = require('./auth-controller');

var auth = require('./index');
var authRouter = express.Router();

authRouter.post('/signup', authControllers.signup);

authRouter.use('/login', auth.authenticate('local'), function (req, res) {
  res.redirect('/');
});

// All
authRouter.use('/logout', authControllers.logout);

module.exports = authRouter;
