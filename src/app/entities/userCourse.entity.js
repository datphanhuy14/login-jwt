import Entity from '../entity';
import db from '../models';

class userCourseEntity extends Entity {
  constructor() {
    super(db.userCourses);
  }
}
export default new userCourseEntity;
