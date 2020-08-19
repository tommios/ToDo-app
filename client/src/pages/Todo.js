import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import API from "../api";
import TodoForm from "../components/forms/TodoForm";
import TodoView from "../components/TodoView";

const Todo = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const { isEdit } = location;

  const [todo, setTodo] = useState({});
  const [editMode, setEditMode] = useState(isEdit);

  useEffect(() => {
    if (id) {
      API.todo.getById(id).then((res) => {
        setTodo(res);
      });
    }
  }, [id]);

  const handleUpdate = (data) => {
    return API.todo.update(todo._id, data).then((todo) => {
      setTodo(todo);
      setEditMode(false);
    });
  };

  if (!todo) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {editMode && id ? (
        <TodoForm
          formData={todo}
          onSubmit={handleUpdate}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <TodoView todo={todo} onEdit={() => setEditMode(true)} />
      )}
    </Container>
  );
};

export default Todo;
