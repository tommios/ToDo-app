// Load Todo model
import Todo from "../models/todo.model";
import { schemaTodo } from "../validations/todoValidation";

import moment from "moment";

// Create and Save a new Todo
export const createTodo = async (req, res) => {
  // Create a Todo
  const { error } = schemaTodo.validate(req.body);

  if (error) {
    res.status(500).send({
      message: error.message,
    });

    return;
  }

  try {
    const { title, body, completed } = req.body;
    const todo = new Todo({ title, body, completed });

    // Save Todo in the database
    todo
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Todo.",
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// Get a single Todo with an id
export const findOneTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send({ message: "Not found Todo with id " + id });
    }
    return res.send(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Oops! Something went wrong..." });
  }
};

// Get all Todo
export const findAllTodo = (req, res) => {
  Todo.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Get filter Todo
export const filterTodo = (req, res) => {
  const { completed } = req.body;

  Todo.find({ completed })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Update a Todo by the id in the request
export const updateTodo = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const data = {
    title: req.body.data.title,
    body: req.body.data.body,
    completed: req.body.data.completed,
  };

  const { error } = schemaTodo.validate(data);
  if (error) {
    return res.status(400).send({
      message: error.message,
    });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(id, data, { new: true });
    return res.send(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Oops! Something went wrong!" });
  }
};

// Delete a Todo with the specified id in the request
export const deleteTodo = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else {
        res.send({
          message: "Todo was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id,
      });
    });
};

// Delete all Todo from the database.
export const deleteAllTodo = (req, res) => {
  Todo.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Todo were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Todo.",
      });
    });
};
