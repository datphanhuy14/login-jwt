import Entity from '../entity';
import db from '../models';

class tagEntity extends Entity {
    constructor() {
        super( db.tags );
    }
}
export default new tagEntity;
