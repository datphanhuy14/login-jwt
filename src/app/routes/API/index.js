import course from './course.route';
import rate from './rate.route';
import subject from './subject.route';
import userCourse from './userCourse.route';
import { Router } from 'express';
const router = Router();

router.use('/course', course);
router.use('/userCourse', userCourse);
router.use('/rate', rate);
router.use('/subject', subject);

export default router;
