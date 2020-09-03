import Router from "express-promise-router";
import {verifySignUp} from "../middlewares/index";
import {signUp, signIn, refreshToken, resetPassword, newPassword, makeJwt} from "../controllers/auth.controller";
//import {config} from "dotenv";
import config from "../config";
// import {tokenChecker} from "../middlewares/tokenChecker"

const authRouter = Router();

authRouter.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRouter.get("/auth/login", (req,res)=>{
    // res.redirect(config.sendgrid.baseURL + "/login");
    res.redirect("http://[::1]:3000" + "/login");
});
authRouter.post("/auth/signin", signIn, makeJwt);
authRouter.post("/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, signUp, makeJwt);
authRouter.post("/auth/token", refreshToken);
authRouter.post("/auth/reset", resetPassword);
authRouter.get("/auth/password/:token", newPassword);

// authRouter.use((req, res, next) => {
//     tokenChecker(req, res, next)
// });

export default authRouter;