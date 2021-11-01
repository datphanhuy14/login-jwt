import Entity from '../entity';
import db from '../models';

class answerLogEntity extends Entity {
    constructor() {
        super( db.answerLogs );
    }
}
export default new answerLogEntity;
