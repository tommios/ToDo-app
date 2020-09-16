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

    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                return res.status(400).send({message: err});
            }

            const hash = buffer.toString("hex");

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
                country: req.body.country,
                email: req.body.email,
                hash: hash,
                password: bcrypt.hashSync(req.body.password, 8)
            });

            await user.save((err, user) => {
                if (err) {
                    res.status(500).send({message: err.message});
                    return;
                }
                req.user = user;
                next();
            })

            await mailer.sendMail(regEmail(user.email, user.hash));
            // await mailer.sendMail(resetEmail(candidate.email, candidate.resetPasswordToken));
            // return res.status(200).send("Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.");

        })
    } catch (e) {
        console.log(e)
    }

    // const user = new User({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     username: req.body.username,
    //     phoneNumber: req.body.phoneNumber,
    //     country: req.body.country,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, 8)
    // });

    // user.save((err, user) => {
    //     if (err) {
    //         res.status(500).send({message: err.message});
    //         return;
    //     }
    //
    //     req.user = user;
    //     next();
    // }

    // await mailer.sendMail(regEmail(user.email));
}


export const logIn = (req, res, next) => {
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
    const payload = {
        "id": req.user._id,
        "username": req.user.username
    };

    const token = jwt.sign(payload, config.auth.secret, {expiresIn: config.auth.tokenLife}); // tokenLife = (24 hour)
    //const refreshToken = jwt.sign(payload, config.auth.refreshTokenSecret, {expiresIn: config.auth.refreshTokenLife}); // refreshTokenLife = 168h (7 days)

    const response = {
        "token": token,
        "userinfo": {
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username,
            phoneNumber: req.user.phoneNumber,
            country: req.user.country,
            email: req.user.email,
            emailValidated: req.user.emailValidated,
        }
    }
    //tokenList[refreshToken] = response;
    res.status(200).json(response);
};


export const resetPassword = (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                return res.status(400).send({message: err});
            }

            const token = buffer.toString("hex");
            const candidate = await User.findOne({email: req.body.email});

            if (candidate) {
                candidate.resetPasswordToken = token;
                candidate.resetPasswordExpires = Date.now() + 60 * 60 * 3 * 1000; // 3 hour
                await candidate.save();

                await mailer.sendMail(resetEmail(candidate.email, candidate.resetPasswordToken));
                return res.status(200).send("Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.");
            } else {
                return res.status(404).send("Email not found!");
            }
        })
    } catch (e) {
        console.log(e)
    }
}


export const newPassword = async (req, res, next) => {
    if (!req.params.token) {
        return res.status(400).send("Token not found!");
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        })

        if (!user) {
            return res.status(401).send(`Token expired!`);
        } else {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();

            req.user = user;
            next();
            //return res.status(200).send(`Token expired! resetTokenExp: ${user.resetPasswordExpires.toLocaleString()};  new Date: ${(new Date).toLocaleString()} `);
        }
    } catch (e) {
        console.log(e)
    }
}


export const getUserInfo = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(accessToken, config.auth.secret);

        if (new Date(decoded.exp * 1000) > new Date()) {
            User.findOne({_id: decoded.id})
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if (!user) {
                        return res.status(404).send({message: "User Not found."});
                    }

                    const response = {
                        "userinfo": {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            phoneNumber: user.phoneNumber,
                            country: user.country,
                            email: user.email,
                            emailValidated: user.emailValidated,
                        }
                    }
                    res.status(200).json(response);
                })
        } else {
            res.status(401).send('Token expired');
        }
    } catch
        (e) {
        res.status(401).send('Invalid token');
    }
}


export const emailValidate = (req, res) =>{
    console.log(req.params);
    if (!req.params.hash) {
        return res.status(400).send("Token not found!");
    }
}