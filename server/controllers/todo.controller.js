// Load Todo model
import Todo from "../models/todo.model";
import jwt from "jsonwebtoken";
import {schemaTodo} from "../validations/todoValidation";

const extractUserIdFromJwt = (req, res) => {
    const userInfoFromJwt = jwt.decode(req.headers.authorization.split(' ')[1]);
    return userInfoFromJwt.id;
}

// Create and Save a new Todo
export const createTodo = async (req, res) => {
    // Create a Todo
    const {error} = schemaTodo.validate(req.body);

    if (error) {
        res.status(500).send({
            message: error.message,
        });
        return;
    }

    try {
        const {title, body, completed, userId} = req.body;
        const todo = new Todo({title, body, completed, userId});

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
    const userId = extractUserIdFromJwt(req,res);
    const id = req.params.id;

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).send({message: "Not found Todo with id " + id});
        }
        if (todo.userId != userId) {
            return res.status(401).send({message: "No access rights to this document"});
        }
        return res.send(todo);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Oops! Something went wrong..."});
    }
};

// Get all Todo
export const findAllTodo = async (req, res) => {
    const {search, completed} = req.query;
    const userId = extractUserIdFromJwt(req,res);

    const params = Object.keys({search, completed}) // ['title', 'body', 'completed']
        .filter((key) => !!req.query[key]) // if (!!req.query['body'])
        .reduce((result, current) => {
            // {}, 'title'
            switch (current) {
                case "search":
                    result.$or = [
                        {title: {$regex: new RegExp(req.query[current], "i")}},
                        {body: {$regex: new RegExp(req.query[current], "i")}},
                    ];
                    break;
                default:
                    result[current] = req.query[current];
            }
            return result;
        }, {});

    // if (title !== undefined) params.title = title;
    // if (body !== undefined) params.body = body;
    // if (completed !== undefined) params.completed = completed;
    params.userId = userId;
    try {
        await Todo.find(params)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving todos.",
                });
            });
    } catch (error) {
        console.log(error);
    }
};

// Update a Todo by the id in the request
export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const data = {
        title: req.body.title,
        body: req.body.body,
        completed: req.body.completed,
    };

    const {error} = schemaTodo.validate(data);
    if (error) {
        return res.status(400).send({
            message: error.message,
        });
    }

    try {
        const todo = await Todo.findByIdAndUpdate(id, data, {new: true});
        return res.send(todo);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Oops! Something went wrong!"});
    }
};

// Delete a Todo with the specified id in the request
export const deleteTodo = (req, res) => {
    const id = req.params.id;
    //console.log(id);

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
