const express = require( 'express' );
const router = express.Router();
const cons = require( '../controllers' );
const passport = require( 'passport' );
const {jwtHelper, helper} = require( '../helpers' );

router.post( '/login', cons.auth.login );
router.post( '/refresh-token', cons.auth.refreshToken );
router.post( '/create', cons.user.createUser );
router.get(
    '/google',
    passport.authenticate( 'google', {scope: ['email', 'profile']} ),
);
router.get(
    '/google/callback',
    passport.authenticate( 'google', {
      successRedirect: '/auth/profile',
      failureRedirect: '/login',
    } ),
);
router.get(
    '/facebook',
    passport.authenticate( 'facebook', {scope: ['email', 'profile']} ),
);
router.get(
    '/facebook/callback',
    passport.authenticate( 'facebook', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/login',
    } ),
);
router.get( '/profile', async ( req, res ) => {
  const accessToken = await jwtHelper.generateToken( req.user );
  res.json( helper.formatOutputData( {accessToken}, '{{common.success}}' ) );
} );
router.get( '/logout', function( req, res ) {
  req.logout();
  res.redirect( '/' );
} );
module.exports = router;
