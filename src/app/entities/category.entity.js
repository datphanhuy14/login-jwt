import Entity from '../entity';
import db from '../models';

class categoryEntity extends Entity {
    constructor() {
        super( db.categories );
    }
}
export default new categoryEntity;
