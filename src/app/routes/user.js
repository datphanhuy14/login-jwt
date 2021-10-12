const express = require("express");
const router = express.Router();
const cons = require("../controllers");


router.post("/login", cons.auth.login);
router.post("/refresh-token", cons.auth.refreshToken);
router.post("/create", cons.user.createUser);

module.exports = router;
