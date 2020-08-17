import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import API from "../api";
import TodoEdit from "../components/TodoEdit";
import TodoView from "../components/TodoView";

const Todo = (props) => {
  console.log(props);
  const { id } = useParams();
  const { isEdit } = useLocation();
  const [todo, setTodo] = useState({});

  useEffect(() => {
    API.todo.getById(id).then((res) => {
      setTodo(res);
    });
  }, [id]);

  const handleSubmit = (data) => {};

  //   if (!todo) {
  //     return <h1>Loading...</h1>;
  //   }
  return isEdit ? (
    <TodoEdit todo={todo} onSubmit={handleSubmit} />
  ) : (
    <TodoView todo={todo} />
  );
};

export default Todo;
