import Router from "express-promise-router";
const todoRouter = Router();

import {
  createTodo,
  findAllTodo,
  findOneTodo,
  filterTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
} from "../controllers/todo.controller";

// @route POST /todos
// @desc Create and Save a new Todo
// @access Public
todoRouter.post("/", createTodo);

// @route GET /todos
// @desc Get all Todo
// @access Public
todoRouter.get("/", findAllTodo);

// @route GET /todos/filter/
// @desc Get all Todo
// @access Public
todoRouter.get("/filter/", filterTodo);

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
