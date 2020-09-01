import config from "../config"
import User from '../models/user.model';
import validateRegisterInput from "../validations/registerValidation"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = (req, res, next) => {
    //console.log("\n\n\n  SignUp  ====>  ", req.body);

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

    req.user = user;
    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        next();
        // res.send({message: "User was registered successfully!"});
    });
};

export const signin = (req, res, next) => {
    //console.log("\n\n\n  SignIn  ====> ", req.body);
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            // console.log("\n  user  ====> ", user);
            // console.log("\n  user.password  ====> ", user.password);

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            console.log("\n  passwordIsValid  ====> ", passwordIsValid);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            // let token = jwt.sign({id: user.id}, config.auth.secret, {
            //     expiresIn: 86400 // 24 hours
            // });
            //
            // res.status(200).send({
            //     id: user._id,
            //     username: user.username,
            //     email: user.email,
            //     accessToken: token
            // });
            req.user = user;
            next();
        });
};