import course from './course.controller';
import rate from './rate.controller';
import subject from './subject.controller';
import userCourse from './userCourse.controller';
import lesson from './lesson.controller';
import question from './question.controller';
import questionLog from './questionLog.controller';
import { Router } from 'express';
const router = Router();

router.use('/lesson', lesson);
router.use('/question', question);
router.use('/questionLog', questionLog);
router.use('/course', course);
router.use('/userCourse', userCourse);
router.use('/rate', rate);
router.use('/subject', subject);

export default router;
