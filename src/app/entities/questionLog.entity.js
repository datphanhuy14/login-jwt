import Entity from '../entity';
import db from '../models';

class questionLogEntity extends Entity {
    constructor() {
        super( db.questionLogs );
    }
}
export default new questionLogEntity;
