import Router from "express-promise-router";
import {verifySignUp} from "../middlewares/index";
import {
    signUp,
    logIn,
    refreshToken,
    resetPassword,
    newPassword,
    makeJwt,
    getUserInfo
}
    from "../controllers/auth.controller";

const authRouter = Router();

authRouter.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRouter.post("/login", logIn, makeJwt);
authRouter.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail, signUp, makeJwt);
authRouter.post("/token", refreshToken);
authRouter.get("/userinfo", getUserInfo);
authRouter.post("/reset", resetPassword);
authRouter.post("/password/:token", newPassword, makeJwt);

export default authRouter;