/*jshint node:true */
'use strict';

var config = require('config');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var LocalStrategy = require('passport-local').Strategy;
var r = require('../db');

/*!
 * Compare passwords and see if the match
 * @param <String>
 * @param <String>
 * @return <Promise>
 */
var doPasswordsMatch = function (submittedPassword, passwordInDatabase) {
  var compare = bluebird.promisify(bcrypt.compare);
  return compare(submittedPassword, passwordInDatabase);
};

passport.serializeUser(function (user, done) {
  return done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  /*!
   * Step 2.1 : Login
   *
   * Query instructions:
   * Write a query that gets a user through by his email
   * the `email` field is the table's primary key
   * The result should be an object with the user email and password hash
   * HINT: Don't use the filter method.
   *
   * Callback instructions:
   * Once the user has been returned, pass it to the `done` function as the
   * second argument:
   *   done(null, user);
   *
   * Result:
   * Once you complete the 2 queries in this file, you'll be able to
   * log in to the site.
   */
});

// Local
passport.use(new LocalStrategy({
  usernameField: 'email',
}, function(email, password, done) {
  /*!
   * Step 2.2 : User login
   *
   * Query instructions:
   * Write a query to get a user by their email
   *
   * Callback instructions:
   * Check to see if the user exists (is not `null`) and if
   * the password submitted by the user
   * matches the password in the database.
   * If the user is null, call `done` with `null` and `false`
   *   done(null, false);
   * If the passwords dont match, call `done` with `null` and `false`
   *   done(null, false);
   * If the user is found, call `done` with `null`, and the user object
   *   done(null, user);
   *
   * Result:
   * After completing step 2.1 and this step, you'll be able
   * to login with the created account.
   */
  }
));

passport.checkIfLoggedIn = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).send('You\'re not logged in');
};

module.exports = passport;
