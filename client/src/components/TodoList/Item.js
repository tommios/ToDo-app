import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Link as MaterialLink,
} from "@material-ui/core";

import {
  Edit as EditIcon,
  ViewHeadline as ViewHeadlineIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

const Item = (props) => {
  const { onDelete } = props;
  return (
    <Card className="" variant="outlined">
      <CardHeader
        component="header"
        title={props.todo.title}
        subheader={moment(props.todo.created).fromNow()}
      />

      <CardContent component="section">
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

        <MaterialLink href="#" onClick={() => onDelete(props.todo._id)}>
          <DeleteIcon />
        </MaterialLink>
      </CardActions>
    </Card>
  );
};

export default Item;
