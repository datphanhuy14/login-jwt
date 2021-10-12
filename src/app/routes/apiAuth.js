const express = require("express");
const router = express.Router();
const cons = require("../controllers")
const apiv1 = require('./API/course.route')


/* Test routes. */
router.get("/test", cons.test.friendLists);
router.get("/initdb", cons.test.initDb);
router.get("/getAll", cons.user.list2);
// Course Routes
router.use('/api/v1',apiv1)



module.exports = router;
