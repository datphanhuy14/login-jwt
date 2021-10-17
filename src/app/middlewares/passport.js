import passport from 'passport';
import { Strategy as FacebookStrategy } from "passport-facebook";
import {
  clientID as _clientID,
  clientSecret as _clientSecret,
  callbackURL as _callbackURL,
  gClientID,
  gClientSecret,
  gCallbackURL,
} from "../config/db.config";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import db from "../models";
// const {jwtHelper} = require('../helpers')

passport.serializeUser(function (user, cb) {
  console.log(user);
  cb(null, user);
});
passport.deserializeUser(function (user, cb) {
  cb(null, user);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: _clientID,
      clientSecret: _clientSecret,
      callbackURL: _callbackURL,
      profileFields: ["email", "gender", "locale", "displayName"],
    },
    function (request, accessToken, refreshToken, profile, cb) {
      process.nextTick(function () {
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
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: gClientID,
      clientSecret: gClientSecret,
      callbackURL: gCallbackURL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, cb) {
      process.nextTick(function () {
        console.log(1234);
        db.users
          .findOrCreate({
            where: {
              email: profile.email,
            },
            defaults: {
              email: profile._json.email,
              fullname: profile.displayName,
              // user_fullName: profile.displayName,
              googleId: profile.id,
              roleId: 0
            },
          })
          .then((user) => {
            request.session.user = user;
            return cb(null, user[0]);
          });
      });
    }
  )
);
