const {jwtHelper} = require( '../helpers' );
const debug = console.log.bind( console );
const bcrypt = require( 'bcryptjs' );
const db = require( '../models' );
const _ = require( 'lodash' );
const {helper} = require( '../helpers' );
require( 'dotenv' ).config();
const tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const login = async ( req, res ) => {
  try {
    // email and password
    const email = req.body.email;
    const password = req.body.password;
    let user = await db.users.findOne( {
      where: {
        email: email,
      },
      raw: true,
    } );
    if ( !user ) return res.status( 400 ).json( {msg: 'User not exist'} );
    const comparePass = bcrypt.compareSync( password, user.password );
    if ( !comparePass ) {
      return res.status( 400 ).json( {msg: 'Password incorrect'} );
    }
    const accessToken = await jwtHelper.generateToken(
        user,
        accessTokenSecret,
        accessTokenLife,
    );
    const refreshToken = await jwtHelper.generateToken(
        user,
        refreshTokenSecret,
        refreshTokenLife,
    );

    tokenList[refreshToken] = {accessToken, refreshToken};
    user = _.omit( user, ['password'] );
    return res
        .status( 200 )
        .json(
            helper.formatOutputData(
                {user, accessToken, refreshToken},
                '{{common.success}}',
            ),
        );
  } catch ( error ) {
    return res.status( 500 ).json( helper.displayErrorMessage( error ) );
  }
};
const refreshToken = async ( req, res ) => {
  console.log( req.body.refreshToken );
  const refreshTokenFromClient = req.body.refreshToken;
  if ( refreshTokenFromClient && tokenList[refreshTokenFromClient] ) {
    try {
      const decoded = await jwtHelper.verifyToken(
          refreshTokenFromClient,
          refreshTokenSecret,
      );
      const user = decoded.data;
      const accessToken = await jwtHelper.generateToken(
          user,
          accessTokenSecret,
          accessTokenLife,
      );
      return res
          .status( 200 )
          .json( helper.formatOutputData( accessToken, '{{common.success}}' ) );
    } catch ( error ) {
      debug( error );

      res
          .status( 403 )
          .json(
              helper.displayErrorMessage( {message: 'Invalid refresh token.'} ),
          );
    }
  } else {
    return res.status( 403 ).json(
        helper.displayErrorMessage( {
          message: 'No token provided.',
        } ),
    );
  }
};

module.exports = {
  login,
  refreshToken,
};
