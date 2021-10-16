import { Router } from 'express';
const router = Router();
import loginApi from './user';
import mainApi from './apiAuth';
import { isAuth } from '../middlewares/';

/* GET home page. */
router.use( '/auth', loginApi );
router.use( '/api', isAuth, mainApi );

export default router;
