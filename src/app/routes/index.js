var express = require('express');
var router = express.Router();
const loginApi = require('./login');
const mainApi = require('./api');
const {AuthMiddleWare} = require("../middlewares/");

/* GET home page. */

router.use('/', loginApi)
router.use('/api',AuthMiddleWare.isAuth, mainApi)
router.post('/init', function(req, res) {
  res.status(404).json({message: "Not found content"})
});

module.exports = router;
