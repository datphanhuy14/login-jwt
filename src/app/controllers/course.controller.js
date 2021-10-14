const models = require('../models');

const resourceController = require('../helpers/resource');

module.exports = resourceController(models.courses);
