import todoRouter from "./todo.route";
import authRouter from "./auth.routes";
import userRouter from "./user.routes"

export default (app) => {
    app.use("/todos/", todoRouter);
    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);
};
