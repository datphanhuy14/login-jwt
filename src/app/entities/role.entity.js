import Entity from '../entity';
import db from '../models';

class roleEntity extends Entity {
  constructor() {
    super( db.roles );
  }
}
export default new roleEntity;
