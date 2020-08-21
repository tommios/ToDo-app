import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../api";
import TodoForm from "../components/forms/TodoForm";
import { Alert } from "@material-ui/lab";

const NewTodo = (props) => {
  //console.log("NewTodo props: ", props);

  const history = useHistory();
  const [error, setError] = useState();

  const onSubmit = (data) => {
    setError(undefined);
    return API.todo
      .create(data)
      .then(() => {
        history.push("/todos");
      })
      .catch((error) => {
        setError("Oops! Something went wrong, please try later");
      });
  };

  const onCancel = () => {
    history.push("/todos");
  };

  return (
    <>
      <Link
        to={{
          pathname: "/",
        }}
        className="btn"
      >
        Back
      </Link>
      {!!error && <Alert severity="error">{error}</Alert>}
      <TodoForm onSubmit={onSubmit} onCancel={onCancel} />
    </>
  );
};

export default NewTodo;
