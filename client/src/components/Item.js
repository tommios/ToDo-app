import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";

export function Item(props) {
  return (
    <Card className="" variant="outlined">
      <CardHeader
        title={props.todo.title}
        subheader={moment(props.todo.created).fromNow()}
      />

      <CardContent>
        <Typography className="" color="textSecondary" gutterBottom>
          {props.todo.body}
        </Typography>
      </CardContent>

      <CardActions>
        <Link
          to={{
            pathname: `/todos/${props.todo._id}`,
            isEdit: false,
          }}
          className="btn"
        >
          <ViewHeadlineIcon />
        </Link>

        <Link
          to={{
            pathname: `/todos/${props.todo._id}`,
            isEdit: true,
          }}
          className="btn"
        >
          <EditIcon />
        </Link>

        <Link to="#" className="btn">
          <DeleteIcon />
        </Link>
      </CardActions>
    </Card>
  );
}
