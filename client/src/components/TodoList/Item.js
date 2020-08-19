import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  Button,
  Link as MaterialLink,
} from "@material-ui/core";

import {
  Edit as EditIcon,
  ViewHeadline as ViewHeadlineIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

const Item = (props) => {
  const { todo, onDelete, onUpdate } = props;
  const handleChange = (event) => {
    onUpdate({ ...todo, completed: event.target.checked });
  };

  return (
    <Card className="" variant="outlined">
      <CardHeader
        component="header"
        action={
          <Checkbox
            checked={todo.completed}
            onChange={handleChange}
            name="checked"
            color="primary"
          />
        }
        title={todo.title}
        subheader={moment(todo.created).fromNow()}
      />
      {!todo.completed ? (
        <CardContent component="section">
          <Typography className="" color="textSecondary" gutterBottom>
            {todo.body}
          </Typography>
        </CardContent>
      ) : (
        <CardContent component="section">
          <Typography
            className=""
            color="textSecondary"
            gutterBottom
          ></Typography>
        </CardContent>
      )}

      <CardActions>
        <Link
          to={{
            pathname: `/todos/${todo._id}`,
            isEdit: false,
          }}
          className="btn"
        >
          <ViewHeadlineIcon />
        </Link>
        <Link
          to={{
            pathname: `/todos/${todo._id}`,
            isEdit: true,
          }}
          className="btn"
        >
          <EditIcon />
        </Link>

        <MaterialLink href="#" onClick={() => onDelete(todo._id)}>
          <DeleteIcon />
        </MaterialLink>
      </CardActions>
    </Card>
  );
};

export default Item;
