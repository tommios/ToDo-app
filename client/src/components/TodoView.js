import React from "react";
import moment from "moment";
import { Link as MaterialLink } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function TodoView(props) {
  const { todo = {}, onEdit } = props;
  return todo ? (
    <>
      <div>
        <Link
          to={{
            pathname: "/",
          }}
          className="btn"
        >
          Back
        </Link>
        <MaterialLink onClick={onEdit} href="#">
          Edit
        </MaterialLink>
      </div>
      <h2>{todo.title}</h2>
      <hr />
      <p>{todo.body}</p>
      <p>{moment(todo.created).fromNow()}</p>
    </>
  ) : (
    "Ops! No todo yet"
  );
}
