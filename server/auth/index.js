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
  /*!
   * Query Instructions:
   * Write a query that gets a user through by his email
   * the `email` field is the table's primary key
   * The result should be an object with the user email and password hash
   * HINT: Don't use the filter method.
   *
   * Callback Instructions:
   * Once the user has been returned, pass it to the `done` function as the
   * second argument:
   *   done(null, user);
   *
   * Result:
   * Once you complete the 2 queries in the file, you'll be able to
   * log in to the site.
   */
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
