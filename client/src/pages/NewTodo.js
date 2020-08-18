import React from "react";
import API from "../api";
import TodoForm from "../components/forms/TodoForm";

const NewTodo = (props) => {
  const onSubmit = () => {
    return API.todo.create();
  };

  return (
    <>
      <TodoForm onSubmit={onSubmit} />
    </>
  );
};

export default NewTodo;
