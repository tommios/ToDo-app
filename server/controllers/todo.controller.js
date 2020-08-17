// Load Todo model
import Todo from "../models/todo.model";
import { schemaTodo } from "../validations/todoValidation";

import moment from "moment";

// Create and Save a new Todo
export const createTodo = (req, res) => {
  // Create a Todo
  const { error } = schemaTodo.validate(req.body);

  if (error) {
    res.status(500).send({
      message: error.message,
    });

    return;
  }

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
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};

// Get a single Todo with an id
export const findOneTodo = (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Todo with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Todo with id=" + id });
    });
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
export const updateTodo = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const { error } = schemaTodo.validate(req.body);

  if (error) {
    res.status(500).send({
      message: error.message,
    });

    return;
  }

  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: "Todo was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id,
      });
    });
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
