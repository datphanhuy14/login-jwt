const Entity = require( '../entity' );
const models = require( '../models' );

class courseEntity extends Entity {
  constructor() {
    super( models.courses );
  }
}
module.exports = new courseEntity;
