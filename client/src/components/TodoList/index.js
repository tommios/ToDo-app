import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginAdd: {
    textAlign: "center",
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(6),
  },
  relative: {
    textAlign: "center",
  },
}));

const List = (props) => {
  const { todos, onDelete } = props;
  const classes = useStyles();

  return (
    <>
      <Link to="/todos/new">
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Link>
      <Grid container justify="flex-start" spacing={2}>
        {todos.map((todo) => (
          <Grid key={todo._id} item xs={6} component="article">
            <Item todo={todo} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default List;
