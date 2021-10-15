const auth = require('./auth.controller');
const test = require('./test.controller');
const user = require('./user.controller');
const subject = require('./subject.controller');
const passport = require('./passport.controller');
const level = require('./level.controller');
const course = require('./course.controller');
module.exports = {
  auth, test, user, passport, course, level, subject,
};
