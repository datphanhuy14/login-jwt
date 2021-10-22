import Entity from '../entity';
import db from '../models';

class lessonEntity extends Entity {
    constructor() {
        super( db.lessons );
    }
}
export default new lessonEntity;
