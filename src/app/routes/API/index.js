import course from './course.route';
import level from './level.route';
import subject from './subject.route';
import { Router } from 'express';
const router = Router();

router.use( '/course', course );
router.use( '/level', level );
router.use( '/subject', subject );

export default router;
