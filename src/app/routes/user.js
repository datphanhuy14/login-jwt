import { Router } from "express";
const router = Router();
import { auth, user } from "../controllers";
import passport from "passport";
import { jwtHelper, helper } from "../helpers";

router.post("/login", auth.login);
router.post("/refresh-token", auth.refreshToken);
router.post("/create", user.createUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/profile",
    failureRedirect: "/login",
  })
);
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "profile"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
  })
);
router.get("/profile", async (req, res) => {
  const accessToken = await jwtHelper.generateToken(req.user);
  res.json(helper.formatOutputData({ accessToken }, "{{common.success}}"));
});
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
export default router;
