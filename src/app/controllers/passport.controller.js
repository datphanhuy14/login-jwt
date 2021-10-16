// const db = require("../models");
import { helper, jwtHelper } from '../helpers';
import { authenticate } from 'passport';

const fbPassport = async ( req, res ) => {
  try {
    authenticate( 'facebook', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/login',
    } );
  } catch ( error ) {
    res.status( 400 ).json( helper.displayErrorMessage( error.message ) );
  }
};
const ggPassport = async ( req, res ) => {
  try {
    authenticate( 'google', {
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
export {
  fbPassport,
  profile,
  ggPassport,
};
