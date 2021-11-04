import Entity from '../entity';
import db from '../models';

class userRoleEntity extends Entity {
    constructor() {
        super( db.userRoles );
    }
}
export default new userRoleEntity;
