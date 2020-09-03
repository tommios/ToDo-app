import todoRouter from "./todo.route";
import authRouter from "./auth.routes";
import userRouter from "./user.routes"

export default (app) => {
    app.use("/todos/", todoRouter);
    app.use("/user", userRouter);
    app.use("/", authRouter);
};
