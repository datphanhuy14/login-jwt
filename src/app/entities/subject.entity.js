import Entity from '../entity';
import { subjects } from '../models';

class subjectEntity extends Entity {
  constructor() {
    super( subjects );
  }
}
export default new subjectEntity();
