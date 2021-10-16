import Entity from '../entity';
import { roles } from '../models';

class roleEntity extends Entity {
  constructor() {
    super( roles );
  }
}
export default new roleEntity;
