/*jshint node:true */
'use strict';

var config = require('config');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var LocalStrategy = require('passport-local').Strategy;
var r = require('../db');

passport.serializeUser(function (user, done) {
  return done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  r
    .table('users')
    .get(email)
    .run(r.conn)
    .then(function (user) {
      done(null, user);
    });
});

// Local
passport.use(new LocalStrategy({
  usernameField: 'email',
}, function(email, password, done) {
  var compare = bluebird.promisify(bcrypt.compare);
  r.table('users')
    .get(email)
    .run(r.conn)
    .then(function (user) {
      if (!user || user === null) {
        done(null, false);
        return;
      }
      return compare(password, user.password)
        .then(function (isMatch) {
          if (!isMatch)  {
            done(null, false);
            return;
          }
          done(null, user);
        });
    })
    .catch(done);
  }
));

passport.checkIfLoggedIn = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).send('You\'re not logged in');
};

module.exports = passport;
