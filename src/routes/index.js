var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/init', function(req, res) {
  res.status(404).json({message: "Not found content"})
});
router.get('/*', function(req, res) {
  res.status(404).json({message: "Not found content"})
});

module.exports = router;
