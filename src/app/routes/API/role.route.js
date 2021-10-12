const {restRoutes} = require('../../helpers');
const PostController = require('../controllers/posts');

const routes = restRoutes(PostController);
module.exports = routes;