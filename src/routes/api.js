const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middlewares/auth");
const AuthController = require("../controllers/auth.controller");
const test = require("../controllers/test.controller");
const UserController = require("../controllers/user.controller")

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/create", UserController.createUser);
router.use(AuthMiddleWare.isAuth);
/* GET users listing. */
router.get("/test", test.friendLists);
router.get("/getAll", UserController.list);

module.exports = router;
