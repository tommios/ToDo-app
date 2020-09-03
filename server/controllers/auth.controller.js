import User from '../models/user.model';
import validateRegisterInput from "../validations/registerValidation";
import validateLoginInput from "../validations/loginValidation";
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import regEmail from "../emails/registration";
import resetEmail from "../emails/reset";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

const tokenList = {}

const mailer = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.sendgrid.apiKey
    }
}));

export const signUp = async (req, res, next) => {
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

    await mailer.sendMail(regEmail(user.email));
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
    User.findOne({email: req.body.email})
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }
            user.refreshToken = req.body.refreshToken;
            // if refresh token exists
            if ((user.refreshToken) && (user.refreshToken in tokenList)) {
                const payload = {
                    "id": user._id,
                    "email": user.email,
                    "username": user.username
                }

                const newToken = jwt.sign(payload, config.auth.secret, {expiresIn: config.auth.tokenLife}); // tokenLife = (24 hour)

                const response = {
                    "token": newToken,
                }
                // update the token in the list
                tokenList[user.refreshToken].token = newToken;
                //console.log("\nrefreshToken tokenList ===> \n", tokenList)
                res.status(200).json(response);
            } else {
                res.status(404).send('Invalid request, invalid refreshToken')
            }
        });
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
    const refreshToken = jwt.sign(payload, config.auth.refreshTokenSecret, {expiresIn: config.auth.refreshTokenLife}); // refreshTokenLife = 168h (7 days)

    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response;
    //console.log("\n\nmakeJwt tokenList ===> \n", tokenList);
    res.status(200).json(response);
};

export const resetPassword = (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                return res.redirect("/auth/reset")
            }
            const token = buffer.toString("hex");
            const candidate = await User.findOne({email: req.body.email});

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
                await candidate.save();

                await mailer.sendMail(resetEmail(candidate.email, candidate.resetToken));
                res.status(200).send("Go to page /password/{token}......")
                //res.redirect("/auth/signin");
            } else {
                console.log("Email not found!!!");
                res.redirect("/auth/reset");
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export const newPassword = async (req, res) => {
    console.log(req.params);
    if (!req.params.token) {
        return res.redirect("/auth/login");
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if(user){
            res.redirect("/auth/login")
        }
    } catch (e) {
        console.log(e)
    }

}