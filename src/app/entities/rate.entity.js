import Entity from '../entity';
import db from '../models';

class rateEntity extends Entity {
    constructor() {
        super( db.rates );
    }
}
export default new rateEntity;
