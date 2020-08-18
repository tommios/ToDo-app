import React from "react";
import API from "../api";
import TodoForm from "../components/forms/TodoForm";

const NewTodo = (props) => {
  const onSubmit = (data) => {
    return API.todo.create(data);
  };

  return (
    <>
      <TodoForm onSubmit={onSubmit} />
    </>
  );
};

export default NewTodo;
