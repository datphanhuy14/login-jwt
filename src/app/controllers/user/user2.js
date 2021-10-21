import { userEntity as selfEntity } from '../../entities';
import { Router } from 'express';
import passport from "passport";
import { isAdmin, isAuth } from '../../middlewares';
import { jwtHelper, helper } from "../../helpers";

class Controller {
    // === init router ===
    constructor() {
        const router = Router();

        router
            .route('/')
            .get(this.list)
            .post(isAdmin, this.create);
        router
            .post("/login", this.login);
        router
            .post("/refres-token", this.refreshToken);
        router
            .route('/:id(\\d+)/')
            .get(this.read)
            .put(this.update)
            .delete(this.remove);
        router
            .get(
                "/google",
                passport.authenticate("google", { scope: ["email", "profile"] })
            );
        router
            .get(
                "/google/callback",
                passport.authenticate("google", {
                    successRedirect: "/auth/profile",
                    failureRedirect: "/login",
                })
            );
        router
            .get(
                "/facebook",
                passport.authenticate("facebook", { scope: ["email", "profile"] })
            );
        router
            .get(
                "/facebook/callback",
                passport.authenticate("facebook", {
                    successRedirect: "/auth/profile",
                    failureRedirect: "/auth/login",
                })
            );
        router
            .get(
                "/profile", async (req, res) => {
                    const accessToken = await jwtHelper.generateToken(req.user);
                    res.json(helper.formatOutputData({ accessToken }, "{{common.success}}"));
                });
        router
            .get(
                "/logout", function (req, res) {
                    req.logout();
                    res.redirect("/");
                });

        router.param('id', this.getById);

        return router;
    }

    async login(req, res) {
        try {
            selfEntity
                .login(req.body)
                .then(async (datas) => {
                    res.status(200).json(
                        helper.formatOutputData(datas, '{{common.success}}'),
                    );
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }
    async refreshToken(req, res) {
        try {
            selfEntity
                .refreshToken(req.body)
                .then(async (datas) => {
                    res.status(200).json(
                        helper.formatOutputData(datas, '{{common.success}}'),
                    );
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }


    async list(req, res) {
        try {
            const { options } = req;
            selfEntity
                .list(options)
                .then(async (datas) => {
                    res.status(200).json(
                        helper.formatOutputData(datas, '{{common.success}}'),
                    );
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }

    async read(req, res) {
        try {
            res.status(200).json(
                helper.formatOutputData(req.detail, '{{success.common}}'),
            );
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }

    async create(req, res) {
        try {
            selfEntity
                .create(req.body)
                .then((report) => {
                    res.status(200).json(
                        helper.formatOutputData(report, '{{success.common}}'),
                    );
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }

    async update(req, res) {
        try {
            selfEntity
                .update(req.detail.id, req.body)
                .then((report) => {
                    res.status(200).json(
                        helper.formatOutputData(report, '{{success.common}}'),
                    );
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }

    async remove(req, res) {
        try {
            selfEntity
                .delete(req.detail.id, req.detail, {})
                .then((report) => {
                    const { data, message } = report;

                    res.status(200).json(
                        helper.formatOutputData(data, message),
                    );
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }

    async getById(req, res, next, id) {
        try {
            selfEntity
                .detail(id)
                .then((data) => {
                    req.detail = data;
                    next();
                })
                .catch((report) => {
                    res.status(400).json(report);
                });
        } catch (error) {
            res.status(500).json(helper.displayErrorMessage(error));
        }
    }
}

// const routes = restRoutes(level);
export default new Controller;
