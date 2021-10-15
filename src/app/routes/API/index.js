const course = require('./course.route');
const level = require('./level.route');
const subject = require('./subject.route');
const express = require('express');
const router = express.Router();

router.use('/course', course);
router.use('/level', level);
router.use('/subject', subject);

module.exports = router;
