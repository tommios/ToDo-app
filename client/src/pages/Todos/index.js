import React, { useEffect } from "react";
import TodoList from "../../components/TodoList";
import Sidebar from "../../components/Layout/Sidebar";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./style";
import {
  todoGetAll,
  todoDeleteOne,
  todoUpdate,
} from "../../store/todos/actions";
import { useDispatch, useSelector } from "react-redux";

const ItemList = (props) => {
  const todos = useSelector((state) => state?.todos?.todos || []);
  const isLoading = useSelector((state) => state.todos.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoGetAll());
  }, [dispatch]);

  const classes = useStyles();

  const handleDelete = (id) => {
    dispatch(todoDeleteOne(id));
  };

  const handleUpdate = (id, data) => {
    dispatch(todoUpdate(id, data));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} component="header">
        <Paper className={classes.header}>Todo App</Paper>
        {isLoading && "Loading..."}
      </Grid>

      <Grid item xs={3} component="aside">
        <Sidebar />
      </Grid>

      <Grid item xs={9} component="section">
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </Grid>
    </Grid>
  );
};

export default ItemList;
