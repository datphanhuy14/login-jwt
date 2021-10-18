import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
require("dotenv").config();
import { Router, Models as db } from "./app/";
const app = express();
import session from "express-session";
import passport from "passport";

app.use(
  session({ secret: "zesvn88aaa", saveUninitialized: false, resave: true })
);
app.use(passport.initialize());
app.use(passport.session());

// require("./app/middlewares/passport");
import("./app/middlewares/passport");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.info(
    `Connection has been established successfully ${process.env.DB_PORT}`
  );
});

app.use("/", Router);

module.exports = app;
