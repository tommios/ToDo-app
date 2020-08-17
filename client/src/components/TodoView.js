import React from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import moment from "moment";

export default function TodoView(props) {
  console.log(props);
  const { todo = {} } = props;
  return todo ? (
    <>
      <h2>{todo.title}</h2>
      <p>{todo.body}</p>
      <p>{moment(todo.created).fromNow()}</p>
      <Link
        to={{
          pathname: "/",
        }}
        className="btn"
      >
        {/* <KeyboardBackspaceIcon /> */}
        Back
      </Link>
      <hr />
      <Link to={{ pathname: `/todos/${todo.id}`, isEdit: true }}>Edit</Link>
    </>
  ) : (
    "Ops! No todo yet"
  );
}
