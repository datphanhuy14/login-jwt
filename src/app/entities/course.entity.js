const Entity = require('../entity').default;
const models = require('../models').default;

class courseEntity extends Entity {
  constructor() {
    super( models.courses );
  }
}
module.exports = new courseEntity;
