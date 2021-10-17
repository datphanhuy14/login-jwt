const auth = require('./auth.controller').default;
const test = require( './test.controller' );
const user = require( './user.controller' );
const passport = require( './passport.controller' );

module.exports = {
  auth, test, user, passport,
};
