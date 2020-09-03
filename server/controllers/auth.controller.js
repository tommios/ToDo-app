import User from '../models/user.model';
import validateRegisterInput from "../validations/registerValidation";
import validateLoginInput from "../validations/loginValidation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

const tokenList = {}


export const signUp = (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });


    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err.message});
            return;
        }

        req.user = user;
        next();
    });
};


export const signIn = (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            // Check password
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        req.user = user;
                        next();
                    } else {
                        return res
                            .status(400)
                            .json({message: "Password incorrect"});
                    }
                })
        });
};


export const refreshToken = (req, res) => {
    // refresh the damn token
    const user = req.body;

    // if refresh token exists
    if ((user.refreshToken) && (user.refreshToken in tokenList)) {
        const payload = {
            "id": user._id,
            "email": user.email,
            "username": user.username
        }

        const token = jwt.sign(payload, config.auth.secret, {expiresIn: config.auth.tokenLife});

        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[user.refreshToken].token = token;

        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
}


export const makeJwt = (req, res, next) => {
    // Create JWT Payload
    const user = req.user;

    const payload = {
        "id": user._id,
        "email": user.email,
        "username": user.username
    };

    const token = jwt.sign(payload, config.auth.secret, {expiresIn: config.auth.tokenLife}); // tokenLife = (24 hour)
    const refreshToken = jwt.sign(payload, config.auth.refreshTokenSecret, {expiresIn: '168h'}); // refreshTokenLife = 168h (7 days)

    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response;
    res.status(200).json(response);
};
