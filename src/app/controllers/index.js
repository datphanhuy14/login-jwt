import { Router } from 'express';
const router = Router();
import user2 from './user/user2';
import API from './rediriectAPI';
import { isAuth } from '../middlewares';

/* GET home page. */
// router.use('/dev', devApi);
router.use('/auth', user2);
router.use('/api', isAuth, API);

export default router;
