const dotenv = require( 'dotenv' );
dotenv.config();
module.exports = {
  'username': process.env.DB_USERNAME,
  'password': process.env.DB_PASSWORD,
  'database': process.env.DB_NAME,
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'dialect': process.env.DB_DIALECT,
  'pool': {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  'clientID': '246139654132855',
  'clientSecret': '04c8d2609689a6f5507453a7c4022d94',
  'callbackURL': 'http://localhost:3000/auth/facebook/callback',

  // eslint-disable-next-line max-len
  'gClientID': '416179022389-e1v1eolpug3358v4fd89hifqkn4bcjon.apps.googleusercontent.com',
  'gClientSecret': 'v1JWTjZA4AfscFpf0epR3Pmr',
  'gCallbackURL': 'http://localhost:3000/auth/google/callback',
};
