'use strict';

var passport = require('passport');
var User = require('../users/models').User;
var LocalStrategy = require('passport-local').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.

passport.serializeUser(function (user, fn) {
    fn(null, user.id);
});

passport.deserializeUser(function (id, fn) {
    User.findOne({_id:id}, function (err, user){
        fn(err, user);
    });
});
