const express = require( 'express' );
const router = express.Router();
const loginApi = require( './user' );
const mainApi = require( './apiAuth' );
const {AuthMiddleWare} = require( '../middlewares/' );

/* GET home page. */
router.use( '/auth', loginApi );
router.use( '/api', AuthMiddleWare.isAuth, mainApi );

module.exports = router;
