import jwt from 'jsonwebtoken';
import config from "../config";

export const tokenChecker = (req, res, next) => {
    // let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization']
    let bearer = req.headers['authorization']; // Remove "Bearer "
    let token = bearer.slice(7);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.auth.secret, function (err, decoded) {
            //console.log("tokenChecker decoded ===> ", decoded);
            if (err) {
                console.log(err);
                return res.status(401).json({"error": true, "message": 'Unauthorized access.'});
            }

            req.decoded = decoded;
            next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}
