// const db = require("../models");
const {helper, jwtHelper} = require( '../helpers' );
const passport = require( 'passport' );

const fbPassport = async ( req, res ) => {
  try {
    passport.authenticate( 'facebook', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/login',
    } );
  } catch ( error ) {
    res.status( 400 ).json( helper.displayErrorMessage( error.message ) );
  }
};
const ggPassport = async ( req, res ) => {
  try {
    passport.authenticate( 'google', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/login',
    } );
  } catch ( error ) {
    res.status( 400 ).json( helper.displayErrorMessage( error.message ) );
  }
};

const profile = async ( req, res ) => {
  const accessToken = await jwtHelper.generateToken( req.user );
  res.json(
      helper.formatOutputData(
          {user: req.user, accessToken},
          '{{common.success}}',
      ),
  );
};
module.exports = {
  fbPassport,
  profile,
  ggPassport,
};
