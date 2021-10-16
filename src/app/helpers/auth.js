const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const { User, Team, Report } = require('./sequelize');
// const siteController = require('./controller/SiteContoller');
// const config = require("../config/db.config");
const db = require( '../models' );
const googleClient = require( '../config/google_client' );


function auth( app, passport ) {
  // passport
  passport.serializeUser( function( user, done ) {
    done( null, user );
  } );

  passport.deserializeUser( function( obj, done ) {
    done( null, obj );
  } );

  passport.use(
      new GoogleStrategy(
          {
            clientID: googleClient.id,
            clientSecret: googleClient.secret,
            callbackURL: 'http://localhost:4321/auth/google/callback',
            passReqToCallback: true,
          },
          function( request, accessToken, refreshToken, profile, done ) {
            process.nextTick( function() {
              db.users.findOrCreate( {
                where: {
                  email: profile.email,
                },
                defaults: {
                  email: profile._json.email,
                  fullname: profile.displayName,
                  // user_fullName: profile.displayName,
                  googleId: profile.id,
                },
              } ).then( ( user ) => {
                return done( null, user[0] );
              } );
            } );
          },
      ),
  );

  app.get( '/logout', function( req, res ) {
    req.logout();
    res.redirect( '/' );
  } );
}

module.exports = auth;
