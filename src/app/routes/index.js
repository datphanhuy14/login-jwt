var express = require('express');
var router = express.Router();
const loginApi = require('./user');
const mainApi = require('./api');
const {AuthMiddleWare} = require("../middlewares/");

/* GET home page. */

router.use('/user', loginApi)
router.use('/api',AuthMiddleWare.isAuth, mainApi)
router.post('/init', function(req, res) {
  res.status(404).json({message: "Not found content"})
});

module.exports = router;
