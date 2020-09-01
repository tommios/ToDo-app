import Router from "express-promise-router";
import {verifySignUp} from "../middlewares/index";
import {signup, signin} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

authRouter.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail], signup);

authRouter.post("/signin", signin);

export default authRouter;