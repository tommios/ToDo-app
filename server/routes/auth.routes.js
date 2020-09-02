import Router from "express-promise-router";
import {verifySignUp} from "../middlewares/index";
import {signUp, signIn, refreshToken, makeJwt} from "../controllers/auth.controller";
// import {tokenChecker} from "../middlewares/tokenChecker"

const authRouter = Router();

authRouter.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRouter.post("/signin", signIn, makeJwt);
authRouter.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail, signUp, makeJwt);
authRouter.post("/token", refreshToken);

// authRouter.use((req, res, next) => {
//     tokenChecker(req, res, next)
// });

export default authRouter;