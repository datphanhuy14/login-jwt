const {restRoutes} = require('../../helpers');
const courses = require('../../controllers/course.controller');

const routes = restRoutes(courses);
module.exports = routes;