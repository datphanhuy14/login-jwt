import Entity from '../entity';
import db from '../models';

class questionEntity extends Entity {
    constructor() {
        super( db.questions );
    }
}
export default new questionEntity;
