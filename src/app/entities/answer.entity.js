import Entity from '../entity';
import db from '../models';

class answerEntity extends Entity {
    constructor() {
        super( db.aswers );
    }
}
export default new answerEntity;
