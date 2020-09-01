import Router from "express-promise-router";
import {verifySignUp} from "../middlewares/index";
import {signup, signin} from "../controllers/auth.controller";
import makeJWT from "../middlewares/makeJwt"

const authRouter = Router();

authRouter.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

authRouter.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail], signup, makeJWT);
authRouter.post("/signin", signin, makeJWT);

export default authRouter;