const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/db.config');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models');
// const {jwtHelper} = require('../helpers')


passport.serializeUser(function(user, cb) {
  console.log(user);
  cb(null, user);
});
passport.deserializeUser(function(user, cb) {
  cb(null, user);
});
passport.use(
    new FacebookStrategy(
        {
          clientID: config.clientID,
          clientSecret: config.clientSecret,
          callbackURL: config.callbackURL,
          profileFields: ['email', 'gender', 'locale', 'displayName'],
        },
        function(request, accessToken, refreshToken, profile, cb) {
          process.nextTick(function() {
            db.users
                .findOrCreate({
                  where: {
                    facebookId: profile.id,
                  },
                  defaults: {
                    email: profile._json.email,
                    fullname: profile.displayName,
                    // user_fullName: profile.displayName,
                    facebookId: profile.id,
                  },
                })
                .then((user) => {
                  request.session.user = user;
                  return cb(null, user[0]);
                });
          });
        },
    ),
);

passport.use(
    new GoogleStrategy(
        {
          clientID: config.gClientID,
          clientSecret: config.gClientSecret,
          callbackURL: config.gCallbackURL,
          passReqToCallback: true,
        },
        function(request, accessToken, refreshToken, profile, cb) {
          process.nextTick(function() {
            db.users
                .findOrCreate({
                  where: {
                    googleId: profile.id,
                  },
                  defaults: {
                    email: profile._json.email,
                    fullname: profile.displayName,
                    // user_fullName: profile.displayName,
                    googleId: profile.id,
                  },
                })
                .then((user) => {
                  request.session.user = user;
                  return cb(null, user[0]);
                });
          });
        },
    ),
);

