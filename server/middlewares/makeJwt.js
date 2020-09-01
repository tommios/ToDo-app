import jwt from "jsonwebtoken";
import config from "../config";

const makeJwt = (req, res, next) => {

    const user = req.user;

    let token = jwt.sign({id: user.id}, config.auth.secret, {
        expiresIn: 86400 // 24 hours
    });

    return res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
    });
};

export default makeJwt;
