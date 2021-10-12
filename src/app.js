const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const defautRoute = require('./app/routes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = require("./app/models");
// const Role = db.role;

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.info(`Connection has been established successfully ${process.env.DB_PORT}`);

});


// app.use('/api', ApiRoute);
app.use('/', defautRoute);


module.exports = app;
