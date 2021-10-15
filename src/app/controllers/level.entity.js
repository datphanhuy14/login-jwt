const Entity = require('../helpers/entity');
const models = require('../models');

class ABCD extends Entity {
  constructor() {
    super(models.levels);
  }
}
module.exports = new ABCD;
