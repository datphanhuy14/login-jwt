import { jwtHelper } from "../helpers";
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const isAuth = async (req, res, next) => {
    const tokenFromClient =
    req.body.token || req.query.token || req.headers["authorization"];

    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(
                tokenFromClient,
                accessTokenSecret
            );
            req.jwtDecoded = decoded;
            console.log(req.jwtDecoded);
            if (req.jwtDecoded.data) {
                switch (req.method) {
                    case 'POST':
                        Object.assign(req.body, {
                            createdBy: req.jwtDecoded.data.id,
                            updatedBy: req.jwtDecoded.data.id
                        });
                        break;
                    case 'PUT':
                        Object.assign(req.body, {
                            updatedBy: req.jwtDecoded.data.id
                        });
                        break;
                }
            }
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
const isAdmin = async (req, res, next) => {
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
