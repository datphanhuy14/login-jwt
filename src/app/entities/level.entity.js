import Entity from '../entity';
import db from '../models';

class levelEntity extends Entity {
  constructor() {
    super( db.levels );
  }
}
export default new levelEntity;
