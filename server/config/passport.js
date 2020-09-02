import StrategyPassportJwt from "passport-jwt";
import ExtractPassportJwt from "passport-jwt";
import User from "../models/user.model"
import config from "./index";

const ExtractJwt = ExtractPassportJwt.ExtractJwt;
const JwtStrategy = StrategyPassportJwt.Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.auth.secret

export const passport =  (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};

export default passport;