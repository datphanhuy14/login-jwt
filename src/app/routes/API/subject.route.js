const {restRoutes} = require('../../helpers');
const {subject} = require('../../controllers');

const routes = restRoutes(subject);
module.exports = routes;
