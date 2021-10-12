const express = require("express");
const router = express.Router();
const cons = require("../controllers")

/* GET users listing. */
router.get("/test", cons.test.friendLists);
router.get("/getAll", cons.user.list);

module.exports = router;
