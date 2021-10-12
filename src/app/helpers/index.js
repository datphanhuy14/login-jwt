const jwtHelper = require('./jwt.helper');
const restRoutes = require('./rest');
const resourceController = require('./resource');
const uuidPrimaryKey = require('./uuid');

module.exports = {
    jwtHelper,
    restRoutes,
    resourceController,
    uuidPrimaryKey
}