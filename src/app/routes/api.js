const express = require("express");
const router = express.Router();
const cons = require("../controllers")

/* GET users listing. */
router.get("/test", cons.test.friendLists);
router.get("/initdb", cons.test.initDb);
router.get("/getAll", cons.user.list2);

module.exports = router;
