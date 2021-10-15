const {restRoutes} = require('../../helpers');
const {course} = require('../../controllers');

const routes = restRoutes(course);
module.exports = routes;
