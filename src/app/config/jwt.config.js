const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
