const models = require('../models');
const {entity} = require('../helpers');

module.exports = entity(models.courses, {include: models.levels});
