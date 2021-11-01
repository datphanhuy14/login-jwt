import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
require("dotenv").config();
import { Router, Models as db } from "./app/";
const app = express();
const ExpressRouter = express.Router();
import session from "express-session";
import passport from "passport";
import {controllers, authController} from "./app/";

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

// const { controllers } = App;
if (controllers) {
    for (const controllerName in controllers) {
        if (controllers[controllerName]) {
            app.use('/api/v1', ExpressRouter.use(`/${controllerName}`, controllers[controllerName]));
        }
    }
}
app.use('/api/auth', authController);

module.exports = app;
