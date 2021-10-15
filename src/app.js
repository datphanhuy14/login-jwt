const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const defautRoute = require('./app/routes');
const app = express();
const session = require('express-session');
const passport = require('passport');
const db = require("./app/models");


app.use(session({secret:'zesvn88aaa' , saveUninitialized : false, resave : true}));
app.use(passport.initialize()); 
app.use(passport.session());

require('./app/middlewares/passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.info(`Connection has been established successfully ${process.env.DB_PORT}`);

});


// app.use('/api', ApiRoute);
app.use('/', defautRoute);


module.exports = app;
