import Entity from '../entity';
import { levels } from '../models';

class levelEntity extends Entity {
  constructor() {
    super( levels );
  }
}
export default new levelEntity;
