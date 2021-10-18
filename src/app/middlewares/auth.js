import { jwtHelper } from "../helpers";
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
let isAuth = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.headers["authorization"];

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      debug("Error while verify token:", error);
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};
let isAdmin = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.headers["authorization"];

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      if (req.jwtDecoded.data.roleId == 4)
        next();
      else return res.status(401).json({
        message: "User not permission"
      });
    } catch (error) {
      debug("Error while verify token:", error);
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};


export { isAuth, isAdmin };
