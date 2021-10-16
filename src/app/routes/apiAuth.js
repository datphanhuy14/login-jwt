const express = require( 'express' );
const router = express.Router();
const cons = require( '../controllers' );
const apiv1 = require( './API' );

/* Test routes. */
router.get( '/test', cons.test.friendLists );
router.get( '/initdb', cons.test.initDb );
router.get( '/getAll', cons.user.list2 );
// API Routes
router.use( '/v1', apiv1 );

module.exports = router;
