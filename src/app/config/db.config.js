const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  "clientID"      :     "1076951622832991", 
  "clientSecret"   :     "efac9b9f739df1d000d51194cbfe9a95",
  "callbackURL"      :     "http://localhost:3000/auth/facebook/callback",

  "gClientID" : "416179022389-e1v1eolpug3358v4fd89hifqkn4bcjon.apps.googleusercontent.com",
  "gClientSecret" : "v1JWTjZA4AfscFpf0epR3Pmr",
  "gCallbackURL" : "http://localhost:3000/auth/google/callback"
};