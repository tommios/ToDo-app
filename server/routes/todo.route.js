import Router from "express-promise-router";
const todoRouter = Router();

import {tokenChecker} from "../middlewares/tokenChecker"
import passport from "passport";

import {
  createTodo,
  findAllTodo,
  findOneTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
} from "../controllers/todo.controller";
//import authRouter from "./auth.routes";

todoRouter.use((req, res, next) => {
  tokenChecker(req, res, next);
});

// @route POST /todos
// @desc Create and Save a new Todo
// @access Public
todoRouter.post("/", createTodo);

// @route GET /todos
// @desc Get all Todo
// @access Public
// todoRouter.get("/", passport.authenticate("jwt", { session: false }), findAllTodo);
todoRouter.get("/", findAllTodo);

// @route GET /todos/:id
// @desc Get a single Todo with id
// @access Public
todoRouter.get("/:id", findOneTodo);

// @route PATCH /todos/:id
// @desc Update a Todo with id
// @access Public
todoRouter.patch("/:id", updateTodo);

// @route DELETE /todos/:id
// @desc Delete a Todo with id
// @access Public
todoRouter.delete("/:id", deleteTodo);

// @route DELETE /todos
// @desc Delete all Todo
// @access Public
todoRouter.delete("/", deleteAllTodo);

export default todoRouter;
