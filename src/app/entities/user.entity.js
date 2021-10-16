import Entity from '../entity';
import { roles } from '../models';

class userEntity extends Entity {
  constructor() {
    super( roles );
  }
}
export default new userEntity;
