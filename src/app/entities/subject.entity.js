import Entity from '../entity';
import db from '../models';

class subjectEntity extends Entity {
    constructor() {
        super( db.subjects );
    }
}
export default new subjectEntity();
